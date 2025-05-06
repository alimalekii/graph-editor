import Button from '@/components/Button';
import { t } from 'i18next';
import ComboBox, { COMBO_BOX_DICTIONARY } from '../components/ComboBox';

import Table from '../components/Table';

const MetaDataBox = ({
  fieldName,
  setFieldName,
  fieldNameOptions,
  fieldType,
  setFieldType,
  fieldTypeOptions,
  onAddMetaData,
  metaData,
  onSelectMetaDataTableRow,
  onDeleteMetaDataTableRow,
}: any) => {
  return (
    <div className="bdm-graph-sidebar__body__section">
      <ComboBox
        id="graph-setting-node-edge-field-name"
        label="Field Name"
        placeholder="Field Name"
        plainValue={fieldName}
        plainOptions={fieldNameOptions}
        onChange={(_e: any, value: any) => {
          if (!value) {
            return;
          }
          setFieldName(value);
        }}
        dictionary={COMBO_BOX_DICTIONARY.META}
      />
      <ComboBox
        id="graph-setting-node-edge-field-type"
        label="Field Type"
        placeholder="Field Type"
        plainValue={fieldType}
        plainOptions={fieldTypeOptions}
        onChange={(_e: any, value: any) => {
          if (!value) {
            return;
          }
          setFieldType(value);
        }}
        dictionary={COMBO_BOX_DICTIONARY.FA}
      />
      <Button
        className="bdm-graph-sidebar__body__section__submit"
        title={t('save')}
        disabled={!fieldName || !fieldType}
        onClick={onAddMetaData}
        type="button"
      />
      <Table
        columns={metaData}
        onSelectRow={onSelectMetaDataTableRow}
        onDeleteRow={onDeleteMetaDataTableRow}
      />
    </div>
  );
};

export default MetaDataBox;
