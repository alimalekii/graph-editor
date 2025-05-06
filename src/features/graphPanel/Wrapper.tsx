import './style.scss';

import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import GraphEditor from './GraphEditor';
import SideBar from './SideBar';

import useGraphSettingsWrapper from './WrapperLogic';

gsap.registerPlugin(useGSAP);

const GraphSettingsWrapper = () => {
  const { showSidebar } = useGraphSettingsWrapper();

  const container = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (showSidebar) {
        gsap.to(sidebarRef.current, {
          xPercent: -100,
          autoAlpha: 1,
        });
      } else {
        gsap.to(sidebarRef.current, {
          xPercent: 100,
          autoAlpha: 0,
        });
      }
    },
    {
      dependencies: [showSidebar],
      scope: container,
    }
  );

  return (
    <div className="graph-setting" ref={container}>
      <div className="graph-setting__graph-editor">
        <GraphEditor />
      </div>
      <div className="graph-setting__sidebar" ref={sidebarRef}>
        <SideBar />
      </div>
    </div>
  );
};

export default GraphSettingsWrapper;
