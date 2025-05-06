import { useRef, useState, useEffect } from 'react';
import { IGraphSettingsEdge, IGraphSettingsNode, META_TYPES } from '@/types';
import { ComboObjectOption } from './components/ComboBox';
import { useBDMSelector } from '@/lib/store/hooks';
import { selectPreviewGraph, selectSelected } from '../slice';
import getFileBase64 from '@/lib/utils/getFileBase64';

const nodeTypeData = [
  'account',
  'instagram',
  'instausername',
  'post',
  'simcart',
  'phone',
  'bank',
  'email',
  'location',
  'allTypesData',
  'image',
  'VMSimage',
  'person',
  '',
];

const directionOptions = [
  { title: 'Undirected', value: 'ud' },
  { title: 'Source to Destination', value: 'std' },
  { title: 'Destination to Source', value: 'dts' },
];

const fieldTypeOptions = [...Object.values(META_TYPES), ''];

const useSidebar = () => {
  const selected = useBDMSelector(selectSelected);
  const previewGraph = useBDMSelector(selectPreviewGraph);
  // const { addAToast } = useContext(BDMContext);

  const [name, setName] = useState<string>('');

  const [type, setType] = useState<string | null>(null);

  // foreign key and primary key
  const [foreignKey, setForeignKey] = useState<string>('');
  const [primaryKey, setPrimaryKey] = useState<string>('');
  const [fieldOptions, setFieldOptions] = useState<Array<string>>([]);

  // image
  const [image, setImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');

  // connection for edge
  const [nodeOptions, setNodeOptions] = useState<Array<ComboObjectOption>>([]);
  const [source, setSource] = useState<ComboObjectOption | null>(null);
  const [sourceField, setSourceField] = useState<string>('');
  const [sourceFieldOptions, setSourceFieldOptions] = useState<Array<string>>(
    []
  );
  const [target, setTarget] = useState<ComboObjectOption | null>(null);
  const [targetField, setTargetField] = useState<string>('');
  const [targetFieldOptions, setTargetFieldOptions] = useState<Array<string>>(
    []
  );
  const [direction, setDirection] = useState<ComboObjectOption | null>(null);

  // Path
  const [dataLocationIp, setDataLocationIp] = useState<string>('');
  const [dataLocationPort, setDataLocationPort] = useState<string>('');
  const [dataLocationAddress, setDataLocationAddress] = useState<string>('');

  // MetaData
  const [fieldName, setFieldName] = useState<string | null>(null);
  const [fieldType, setFieldType] = useState<string | null>(null);
  const [metaData, setMetaData] = useState<Record<string, string>>({});

  // list of edges for multiple edge
  const [edgeOptions, setEdgeOptions] = useState<
    Array<{ id: string; label: string }>
  >([]);
  const [canSave, setCanSave] = useState(true);

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(null);
    setImageBase64('');
    // ;(imageInputRef.current as HTMLInputElement).value = ''
  };

  const onAddMetaData = () => {
    setMetaData((prevState) =>
      fieldName && fieldType
        ? { ...prevState, [fieldName]: fieldType }
        : prevState
    );
    setFieldName(null);
    setFieldType(null);
  };

  const onSelectMetaDataTableRow = (fieldName: string) => {
    if (!(fieldName in metaData)) {
      return;
    }
    setFieldName(fieldName);
    setFieldType(metaData[fieldName]);
  };

  const onDeleteMetaDataTableRow = (fieldName: string) => {
    if (!(fieldName in metaData)) {
      return;
    }
    setMetaData((prevState) => {
      delete prevState[fieldName];
      return prevState;
    });
  };

  const onSave = async () => {
    console.log('saved');
  };

  const handleReset = () => {
    setName('');
    setDataLocationIp('');
    setDataLocationAddress('');
    setDataLocationPort('');
    setMetaData({});
    setType('');
    setSource(null);
    setTarget(null);
    setSourceField('');
    setTargetField('');
    setTargetFieldOptions([]);
    setSourceFieldOptions([]);
    setNodeOptions([]);
    setDirection(null);
    setFieldName('');
    setFieldType('');
    setEdgeOptions([]);
    setCanSave(true);
    handleRemoveImage();
    setForeignKey('');
    setPrimaryKey('');
    setFieldOptions([]);
  };

  const onSelectEdge = (id: string) => {
    const foundEdge = previewGraph?.rawData.edges.find((edg) => edg.id === id);

    if (!foundEdge) {
      return;
    }

    setName(foundEdge.label ?? '');
    setDataLocationIp(foundEdge.dataLocation.ip ?? '');
    setDataLocationPort(foundEdge.dataLocation.port ?? '');
    setDataLocationAddress(foundEdge.dataLocation.address ?? '');
    setMetaData(foundEdge.metaData ?? []);
    setType(foundEdge.edgeType ?? '');
    setPrimaryKey(foundEdge.primaryKey ?? '');
    setNodeOptions(
      previewGraph?.graphData.nodes.map((nod) => ({
        title: nod.data.label,
        value: nod.data.id,
      })) ?? []
    );

    const source = previewGraph?.graphData.nodes.find(
      (nod) => nod.id === foundEdge.src
    );
    const target = previewGraph?.graphData.nodes.find(
      (nod) => nod.id === foundEdge.dst
    );

    setSourceFieldOptions(
      Object.keys(source?.data.metaData ?? {}).map((key) => key) ?? []
    );
    setTargetFieldOptions(
      Object.keys(target?.data.metaData ?? {}).map((key) => key) ?? []
    );
    setSource(
      source ? { title: source.data.label, value: source.data.id } : null
    );
    setTarget(
      target ? { title: target.data.label, value: target.data.id } : null
    );
    setSourceField(foundEdge.srcCommonField ?? '');
    setTargetField(foundEdge.dstCommonField ?? '');
    setDirection(
      directionOptions.find((dir) => dir.value === foundEdge.direction) ?? null
    );
    setEdgeOptions([]);
  };

  const onDeleteEdge = (id: string) => {
    const foundEdge = previewGraph?.rawData.edges.find((edg) => edg.id === id);
    if (!foundEdge) {
      return;
    }
  };

  useEffect(() => {
    handleReset();

    if (!selected) {
      return;
    }

    setName(selected.selfData.data?.label ?? '');
    setDataLocationIp(selected.selfData.data?.dataLocation.ip ?? '');
    setDataLocationPort(selected.selfData.data?.dataLocation.port ?? '');
    setDataLocationAddress(selected.selfData.data?.dataLocation.address ?? '');
    setMetaData(selected.selfData.data?.metaData ?? {});
    setPrimaryKey(selected.selfData.data?.primaryKey ?? '');
    setNodeOptions(
      previewGraph?.graphData.nodes.map((nod) => ({
        title: nod.data.label,
        value: nod.data.id,
      })) ?? []
    );

    if (selected.type === 'node') {
      const tSelected = selected.selfData as IGraphSettingsNode;

      setType(tSelected.data.nodeType ?? '');
      setForeignKey(tSelected.data.foreignKey ?? '');
      setPreviewImage(tSelected.data.imagePath ?? '');
    } else if (selected.type === 'edge') {
      const tSelected = selected.selfData as IGraphSettingsEdge;

      const source = previewGraph?.graphData.nodes.find(
        (nod) => nod.id === tSelected.data?.src
      );
      const target = previewGraph?.graphData.nodes.find(
        (nod) => nod.id === tSelected.data?.dst
      );

      setSourceFieldOptions(
        Object.keys(source?.data.metaData ?? {}).map((key) => key) ?? []
      );
      setTargetFieldOptions(
        Object.keys(target?.data.metaData ?? {}).map((key) => key) ?? []
      );

      // edge is one
      if (tSelected.data?.duplicates?.length === 1) {
        setType(tSelected.data?.edgeType ?? '');
        setSource(
          source ? { title: source.data.label, value: source.data.id } : null
        );
        setSourceField(tSelected.data.srcCommonField ?? '');
        setTarget(
          target ? { title: target.data.label, value: target.data.id } : null
        );
        setTargetField(tSelected.data.dstCommonField ?? '');
        setDirection(
          directionOptions.find(
            (dir) => dir.value === tSelected.data?.direction
          ) ?? null
        );
      } else {
        // edge is more then one
        setEdgeOptions(
          previewGraph?.rawData.edges
            .filter((edge) => tSelected.data?.duplicates?.includes(edge.id))
            .map((edg) => ({ id: edg.id, label: edg.label })) ?? []
        );
      }
    }
  }, [selected]);

  useEffect(() => {
    setFieldOptions(Object.entries(metaData).map((item) => item[0]));
  }, [JSON.stringify(metaData)]);

  useEffect(() => {
    if (!image) {
      setPreviewImage('');
      setImageBase64('');
      return;
    }

    const objectUrl = URL.createObjectURL(image);

    setPreviewImage(objectUrl);

    const handleImageBased64 = async () => {
      const imageBase64 = await getFileBase64(image);
      setImageBase64(imageBase64);
    };
    handleImageBased64();
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return {
    selected,
    name,
    setName,
    type,
    setType,
    foreignKey,
    setForeignKey,
    primaryKey,
    setPrimaryKey,
    fieldOptions,
    image,
    setImage,
    previewImage,
    imageInputRef,
    handleRemoveImage,

    dataLocationIp,
    setDataLocationIp,
    dataLocationPort,
    setDataLocationPort,
    dataLocationAddress,
    setDataLocationAddress,
    source,
    setSource,
    target,
    setTarget,
    nodeOptions,

    sourceField,
    setSourceField,
    sourceFieldOptions,
    targetField,
    setTargetField,
    targetFieldOptions,

    direction,
    setDirection,
    directionOptions,

    metaData,
    onAddMetaData,
    fieldName,
    setFieldName,
    fieldNameOptions: sourceFieldOptions,
    fieldType,
    setFieldType,
    fieldTypeOptions,
    onSelectMetaDataTableRow,
    onDeleteMetaDataTableRow,
    nodeTypeData,

    onSave,
    canSave,

    onSelectEdge,
    onDeleteEdge,
    edgeOptions,
    edgeSelectActive: edgeOptions.length > 0,
  };
};

export default useSidebar;
