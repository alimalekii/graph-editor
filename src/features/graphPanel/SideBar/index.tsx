import './style.scss';
import closeIcon from '@/assets/boxCloseIcon.svg';
import Button from '@/components/Button';
import { t } from 'i18next';
import useSidebar from './logic';

import { memo } from 'react';

import InfoBox from './InfoBox';
import MetaDataBox from './MetaDataBox';
import PathBox from './PathBox';
import ConnectionBox from './ConnectionBox';
import EdgeSelectBox from './EdgeSelectBox';

const Seprator = ({ title }: { title: string }) => {
  return (
    <div className="bdm-graph-sidebar__body__seprator">
      <p>{title}</p>
    </div>
  );
};

const Sidebar = () => {
  const {
    selected,
    name,
    setName,
    // type,
    // setType,
    // nodeTypeData,
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
    fieldName,
    setFieldName,
    fieldNameOptions,
    fieldType,
    setFieldType,
    fieldTypeOptions,
    metaData,
    onAddMetaData,
    onSelectMetaDataTableRow,
    onDeleteMetaDataTableRow,
    onSave,
    canSave,
    onSelectEdge,
    onDeleteEdge,
    edgeOptions,
    edgeSelectActive,
  } = useSidebar();

  return selected ? (
    <div className="bdm-graph-sidebar">
      <div className="bdm-graph-sidebar__header">
        <img src={closeIcon} className="bdm-graph-sidebar__header__close" />
      </div>
      <div className="bdm-graph-sidebar__body">
        {edgeSelectActive ? (
          // handle mutiple edges on one edge
          <EdgeSelectBox
            edges={edgeOptions}
            onSelect={onSelectEdge}
            onDelete={onDeleteEdge}
          />
        ) : (
          <>
            <InfoBox
              name={name}
              setName={setName}
              foreignKey={foreignKey}
              setForeignKey={setForeignKey}
              primaryKey={primaryKey}
              setPrimaryKey={setPrimaryKey}
              fieldOptions={fieldOptions}
              type={selected.type}
              image={image}
              setImage={setImage}
              previewImage={previewImage}
              imageInputRef={imageInputRef}
              handleRemoveImage={handleRemoveImage}
            />
            {selected.type === 'edge' && (
              <>
                <Seprator title="Connection" />
                <ConnectionBox
                  source={source}
                  setSource={setSource}
                  target={target}
                  setTarget={setTarget}
                  nodeOptions={nodeOptions}
                  sourceField={sourceField}
                  setSourceField={setSourceField}
                  sourceFieldOptions={sourceFieldOptions}
                  targetField={targetField}
                  setTargetField={setTargetField}
                  targetFieldOptions={targetFieldOptions}
                  direction={direction}
                  setDirection={setDirection}
                  directionOptions={directionOptions}
                />
              </>
            )}
            <Seprator title="Path" />
            <PathBox
              dataLocationIp={dataLocationIp}
              setDataLocationIp={setDataLocationIp}
              dataLocationAddress={dataLocationAddress}
              setDataLocationAddress={setDataLocationAddress}
              dataLocationPort={dataLocationPort}
              setDataLocationPort={setDataLocationPort}
            />

            <Seprator title="MetaData" />
            <MetaDataBox
              fieldName={fieldName}
              setFieldName={setFieldName}
              fieldNameOptions={fieldNameOptions}
              fieldType={fieldType}
              setFieldType={setFieldType}
              fieldTypeOptions={fieldTypeOptions}
              onAddMetaData={onAddMetaData}
              metaData={metaData}
              onSelectMetaDataTableRow={onSelectMetaDataTableRow}
              onDeleteMetaDataTableRow={onDeleteMetaDataTableRow}
            />
          </>
        )}
      </div>
      {/* submit button is not used for edge select option */}
      {edgeSelectActive ? null : (
        <div className="bdm-graph-sidebar__actions">
          <Button
            className="bdm-graph-sidebar__actions__submit"
            title={t('save')}
            disabled={!canSave}
            type="button"
            onClick={onSave}
          />
        </div>
      )}
    </div>
  ) : null;
};

export default memo(Sidebar);
