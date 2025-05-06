import { META_TYPES } from 'src/types';
import { RefObject, ChangeEvent } from 'react';
import fileInputIcon from 'src/assets/fileInputIcon.svg';
// import { AiOutlineLoading3Quarters, AiOutlineClose } from 'react-icons/ai'
import { t } from 'i18next';

import closeIcon from 'src/assets/tableRowDelete.svg';
import loadIcon from 'src/assets/resetIcon.svg';

interface IRuleFileInput {
  title: string;
  dataTypes: Array<Array<string>>;
  accept?: string;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onChangeDataType: (filed: META_TYPES) => void;
  inputRef: RefObject<HTMLInputElement>;
  isLoadingData: boolean;
  handleRemoveFile?: () => void;
  file: File | null;
  forbiddenDataTypes?: Array<string>;
}

const FileInput = (props: IRuleFileInput) => {
  const {
    title,
    dataTypes,
    accept = '.csv',
    onUpload,
    inputRef,
    onChangeDataType,
    isLoadingData,
    handleRemoveFile,
    file,
    forbiddenDataTypes,
  } = props;

  return (
    <div className="bdm-condition-box__item">
      <p className="bdm-condition-box__item__title">{t(title)}</p>
      <div className="bdm-condition-box__file-input">
        <label
          className="bdm-condition-box__file-input__label"
          htmlFor="advenced-filter-file-input"
          onClick={(e) => {
            if (file || dataTypes.length > 0) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
        >
          <img
            src={fileInputIcon}
            width="16px"
            height="14px"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              (inputRef?.current as HTMLInputElement).click();
            }}
          />
          <div className="bdm-condition-box__file-input__status">
            {isLoadingData && (
              <span className="bdm-condition-box__file-input__status__progress">
                <img src={loadIcon} />
              </span>
            )}

            {!isLoadingData && dataTypes.length > 0 && (
              <span
                className="bdm-condition-box__file-input__status__delete"
                onClick={handleRemoveFile}
              >
                <img src={closeIcon} />
              </span>
            )}
          </div>

          {dataTypes.length > 0 && (
            <div className="bdm-condition-box__file-input__type-list">
              {dataTypes.map(([field, type], idx) => (
                <div
                  className="bdm-condition-box__file-input__type-item"
                  key={idx}
                  onClick={() => onChangeDataType(field as META_TYPES)}
                >
                  <span
                    className={`bdm-condition-box__file-input__type-type  ${
                      forbiddenDataTypes?.includes(type) ? 'forbidden' : ''
                    }`.trim()}
                  >
                    {type}
                  </span>
                  <span className="bdm-condition-box__file-input__type-field">
                    {field}
                  </span>
                </div>
              ))}
            </div>
          )}
        </label>
        <input
          id="advenced-filter-file-input"
          className="bdm-condition-box__file-input__input"
          hidden
          type="file"
          accept={accept}
          onChange={onUpload}
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default FileInput;
