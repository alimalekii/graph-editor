import { CONFIG_REGEX_MAP } from '@/constants';

import TextInput from '../components/TextInput';

const PathBox = ({
  dataLocationIp,
  setDataLocationIp,
  dataLocationAddress,
  setDataLocationAddress,
  dataLocationPort,
  setDataLocationPort,
}: any) => {
  return (
    <>
      <div className="bdm-graph-sidebar__body__section">
        <TextInput
          id="graph-setting-node-edge-data-location-ip"
          value={dataLocationIp}
          onChange={(e: any) => setDataLocationIp(e.target.value)}
          placeholder="IP"
          label="IP"
          required={true}
          dir="auto"
          regex={CONFIG_REGEX_MAP.ipValidation.regex}
        />
      </div>
      <div className="bdm-graph-sidebar__body__section">
        <TextInput
          id="graph-setting-node-edge-port"
          value={dataLocationPort}
          onChange={(e: any) => setDataLocationPort(e.target.value)}
          placeholder="Port"
          label="Port"
          required={true}
          dir="auto"
          regex={CONFIG_REGEX_MAP.portValidation.regex}
        />
      </div>
      <div className="bdm-graph-sidebar__body__section">
        <TextInput
          id="graph-setting-node-edge-address"
          value={dataLocationAddress}
          onChange={(e: any) => setDataLocationAddress(e.target.value)}
          placeholder="Address"
          label="Address"
          required={true}
          dir="auto"
          regex={CONFIG_REGEX_MAP.directoryValidation.regex}
        />
      </div>
    </>
  );
};

export default PathBox;
