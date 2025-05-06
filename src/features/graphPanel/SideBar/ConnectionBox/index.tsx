import { Dispatch, SetStateAction } from 'react'
import ComboBox, { COMBO_BOX_DICTIONARY, ComboObjectOption } from '../components/ComboBox'

interface IConnectionBoxProps {
  source: ComboObjectOption | null
  setSource: Dispatch<SetStateAction<ComboObjectOption | null>>
  target: ComboObjectOption | null
  setTarget: Dispatch<SetStateAction<ComboObjectOption | null>>
  nodeOptions: Array<ComboObjectOption>
  sourceField: string
  setSourceField: Dispatch<SetStateAction<string>>
  sourceFieldOptions: Array<string>
  targetField: string
  setTargetField: Dispatch<SetStateAction<string>>
  targetFieldOptions: Array<string>
  direction: ComboObjectOption | null
  setDirection: Dispatch<SetStateAction<ComboObjectOption | null>>
  directionOptions: Array<ComboObjectOption>
}

const ConnectionBox = (props: IConnectionBoxProps) => {
  const {
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
  } = props

  return (
    <>
      <div className='bdm-graph-sidebar__body__section'>
        <ComboBox
          id='graph-setting-edge-source'
          label='Source'
          placeholder='Source'
          value={source}
          options={nodeOptions}
          onChange={(_e: any, value: any) => {
            if (!value) {
              return
            }
            setSource(value)
          }}
          dictionary={COMBO_BOX_DICTIONARY.FA}
        />
      </div>
      <div className='bdm-graph-sidebar__body__section'>
        <ComboBox
          id='graph-setting-edge-target'
          label='Target'
          placeholder='Target'
          value={target}
          options={nodeOptions}
          onChange={(_e: any, value: any) => {
            if (!value) {
              return
            }
            setTarget(value)
          }}
          dictionary={COMBO_BOX_DICTIONARY.FA}
        />
      </div>
      <div className='bdm-graph-sidebar__body__section'>
        <ComboBox
          id='graph-setting-edge-source-field'
          label='Source Field'
          placeholder='Source Field'
          plainValue={sourceField}
          plainOptions={sourceFieldOptions}
          onChange={(_e: any, value: any) => {
            if (!value) {
              return
            }
            setSourceField(value)
          }}
          dictionary={COMBO_BOX_DICTIONARY.FA}
        />
      </div>
      <div className='bdm-graph-sidebar__body__section'>
        <ComboBox
          id='graph-setting-edge-target-field'
          label='Target Field'
          placeholder='Target Field'
          plainValue={targetField}
          plainOptions={targetFieldOptions}
          onChange={(_e: any, value: any) => {
            if (!value) {
              return
            }
            setTargetField(value)
          }}
          dictionary={COMBO_BOX_DICTIONARY.FA}
        />
      </div>
      <div className='bdm-graph-sidebar__body__section'>
        <ComboBox
          id='graph-setting-edge-direction'
          label='Direction'
          placeholder='Direction'
          value={direction}
          options={directionOptions}
          onChange={(_e: any, value: any) => {
            if (!value) {
              return
            }
            setDirection(value)
          }}
          dictionary={COMBO_BOX_DICTIONARY.FA}
        />
      </div>
    </>
  )
}

export default ConnectionBox
