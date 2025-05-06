import TextInput from '../components/TextInput'
import ComboBox, { COMBO_BOX_DICTIONARY } from '../components/ComboBox'
import ImageInput from '../components/ImageInput'
import { SetStateAction, Dispatch, RefObject } from 'react'

interface IInfoBox {
  type: 'node' | 'edge'
  name: string
  setName: Dispatch<SetStateAction<string>>
  foreignKey: string
  setForeignKey: Dispatch<SetStateAction<string>>
  primaryKey: string
  setPrimaryKey: Dispatch<SetStateAction<string>>
  fieldOptions: Array<string>
  image: File | null
  setImage: Dispatch<SetStateAction<File | null>>
  previewImage: string | null
  imageInputRef: RefObject<HTMLInputElement>
  handleRemoveImage: () => void
}

const InfoBox = (props: IInfoBox) => {
  const {
    name,
    setName,
    foreignKey,
    setForeignKey,
    primaryKey,
    setPrimaryKey,
    fieldOptions,
    type,
    image,
    setImage,
    previewImage,
    imageInputRef,
    handleRemoveImage,
  } = props

  return (
    <>
      <div className='bdm-graph-sidebar__body__section'>
        <TextInput
          id='graph-setting-node-edge-name'
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder='Name'
          label='Name'
          required={true}
          dir='auto'
        />
      </div>
      <div className='bdm-graph-sidebar__body__section'>
        <ComboBox
          id='graph-setting-node-edge-foreignkey'
          label='Primary Key'
          placeholder='Primary Key'
          plainValue={primaryKey}
          plainOptions={fieldOptions}
          onChange={(_e: any, value: any) => {
            if (!value) {
              return
            }
            setPrimaryKey(value)
          }}
          dictionary={COMBO_BOX_DICTIONARY.META}
        />
      </div>
      {type === 'node' && (
        <>
          <div className='bdm-graph-sidebar__body__section'>
            <ComboBox
              id='graph-setting-node-edge-foreignkey'
              label='Foreign Key'
              placeholder='Foreign Key'
              plainValue={foreignKey}
              plainOptions={fieldOptions}
              onChange={(_e: any, value: any) => {
                if (!value) {
                  return
                }
                setForeignKey(value)
              }}
              dictionary={COMBO_BOX_DICTIONARY.META}
            />
          </div>
          <div className='bdm-graph-sidebar__body__section'>
            <ImageInput
              id='graph-setting-node-edge-foreign-key'
              image={image}
              setImage={setImage}
              previewImage={previewImage}
              inputRef={imageInputRef}
              handleRemoveImage={handleRemoveImage}
            />
          </div>
        </>
      )}
    </>
  )
}

export default InfoBox
