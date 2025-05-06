import './style.scss';
import { RefObject, ChangeEvent, Dispatch, SetStateAction } from 'react';
// import { AiOutlineClose } from 'react-icons/ai'
import closeIcon from '@/assets/tableRowDelete.svg';
import ImageUploadIcon from '@/assets/image-save-icon.svg';
import sizeFormatter from '@/lib/utils/sizeFormatter';

interface ImageInputProps {
  id: string;
  accept?: string;
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  previewImage: string | null;
  inputRef: RefObject<HTMLInputElement>;
  onUpload?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRemoveImage?: () => void;
  required?: boolean;
  disabled?: boolean;
}

const ImageInput = (props: ImageInputProps) => {
  const {
    id,
    accept = 'images/',
    image,
    setImage,
    previewImage,
    inputRef,
    handleRemoveImage,
    required = false,
    disabled = false,
  } = props;

  return (
    <div className="bdm-graph-setting-image-input">
      <label
        htmlFor={id}
        tabIndex={0}
        className="bdm-graph-setting-image-input__label"
      >
        <img
          src={ImageUploadIcon}
          alt="node image icon"
          width={25}
          height={25}
        />
      </label>
      <div
        className={`bdm-graph-setting-image-input__input ${
          required ? 'input-required' : ''
        }`}
      >
        {previewImage && (
          <img
            className="bdm-graph-setting-image-input__input__preview-img"
            src={previewImage}
          />
        )}
        {image && (
          <p className="bdm-graph-setting-image-input__input__name">
            {image?.name}
          </p>
        )}
        {image && (
          <p className="bdm-graph-setting-image-input__input__size">
            {sizeFormatter(image?.size)}
          </p>
        )}
        {image && (
          <span
            className="bdm-graph-setting-image-input__input__remove"
            onClick={handleRemoveImage}
          >
            <img src={closeIcon} />
          </span>
        )}
        <input
          id={id}
          type="file"
          accept={accept}
          ref={inputRef}
          onChange={(e) => {
            const iamge = (e.target.files as FileList)[0];
            console.log({ iamge });

            setImage((e.target.files as FileList)[0]);
          }}
          disabled={disabled}
          hidden
        />
      </div>
    </div>
  );
};

export default ImageInput;
