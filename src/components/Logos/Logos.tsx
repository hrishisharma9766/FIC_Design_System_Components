import * as React from 'react';
import { cn } from '../../lib/utils';

/** Remote raster assets from Figma MCP (refresh from design file if URLs expire). */
const ASSETS = {
  logoEvaa: 'https://www.figma.com/api/mcp/asset/4a3d3b4e-f430-4ecc-947d-64f34a05d95a',
  logoEvaa1: 'https://www.figma.com/api/mcp/asset/42c9259f-4e02-437c-b551-925dc5e2c47c',
  billingAssistant: 'https://www.figma.com/api/mcp/asset/003b9189-5df3-413b-8041-ee0329e3891d',
  tm: 'https://www.figma.com/api/mcp/asset/189886a3-3208-471e-8c55-3d5d04e6a068',
  virtual: 'https://www.figma.com/api/mcp/asset/e40d908b-8744-4542-8ca7-57bafcc0be99',
  logoEvaa2: 'https://www.figma.com/api/mcp/asset/bee17e47-6d53-423e-a728-75c5244ec8e2',
  billingAssistant1: 'https://www.figma.com/api/mcp/asset/ef0275ef-ebcc-4a1a-a23e-d187c3a79960',
  tm1: 'https://www.figma.com/api/mcp/asset/e98e838e-1f36-46cf-896e-f6d71606cf41',
  scribe: 'https://www.figma.com/api/mcp/asset/86625414-a3cf-4a89-8a4f-785966a3686c',
  group: 'https://www.figma.com/api/mcp/asset/c7f3cb02-796b-41cc-985c-de22396d89ea',
  tm2: 'https://www.figma.com/api/mcp/asset/23aa7231-75ca-4620-81a3-ee4cc1e27683',
  group1: 'https://www.figma.com/api/mcp/asset/9762dc3e-f567-4be4-a9f5-967420469575',
  group2: 'https://www.figma.com/api/mcp/asset/29984769-3384-4523-b387-b9957e7ddaac',
  group3: 'https://www.figma.com/api/mcp/asset/554f94a6-caed-4433-82d8-bf6d933afce3',
  group4: 'https://www.figma.com/api/mcp/asset/7d88fb65-10d6-455c-8387-559db0d3c3bf',
  logoLightMaximEyes: 'https://www.figma.com/api/mcp/asset/3cc246a5-9d6c-4789-8eb8-2a7d2595d2fd',
  logoLightMaximEyes1: 'https://www.figma.com/api/mcp/asset/0ddeccca-47d2-43c6-8fc2-9fd290e95d20',
  vector: 'https://www.figma.com/api/mcp/asset/13dfda67-0a7a-4af2-a8f8-b783dfc86f76',
  vector1: 'https://www.figma.com/api/mcp/asset/69802008-3b06-465b-935b-464cca200907',
  vector2: 'https://www.figma.com/api/mcp/asset/c7e22a55-49bc-4a5b-9aa8-e99b79a161fa',
  vector3: 'https://www.figma.com/api/mcp/asset/8850faac-8441-4391-98d7-0cbb93e16e79',
  group5: 'https://www.figma.com/api/mcp/asset/d7b40ab1-6c68-47f0-9595-892539306eb3',
  group6: 'https://www.figma.com/api/mcp/asset/044e97df-d01b-4e8c-a78f-ac3433937260',
  group7: 'https://www.figma.com/api/mcp/asset/e90c329c-a037-46e4-88b1-fb773c5f2cba',
  group8: 'https://www.figma.com/api/mcp/asset/6bd3404d-2a98-4c58-b175-aebbb5476f2f',
  group9: 'https://www.figma.com/api/mcp/asset/ab6a2dc8-a3cd-482e-84b3-9a8dd5b7569a',
  billingAssistant2: 'https://www.figma.com/api/mcp/asset/17bdefe7-416d-4f02-acc2-47f9aa1a0b07',
  tm3: 'https://www.figma.com/api/mcp/asset/0847071d-8b3f-490c-a4bf-224b304d4059',
  virtual1: 'https://www.figma.com/api/mcp/asset/a8a8d4fc-a6e3-4ff3-9e24-17a8b36acf5e',
  group10: 'https://www.figma.com/api/mcp/asset/d1b96ce4-acf0-4cf1-bb9d-00460d0039d0',
  billingAssistant3: 'https://www.figma.com/api/mcp/asset/9952bf08-9582-4cf9-a062-878b917d5428',
  tm4: 'https://www.figma.com/api/mcp/asset/85c60cc2-2de2-4239-887a-4d75c030a692',
  scribe1: 'https://www.figma.com/api/mcp/asset/ebd8712f-0656-45d0-ae66-9f8f8f5b9bfa',
  group11: 'https://www.figma.com/api/mcp/asset/a600cfcf-7d53-4787-af8b-528aa08ad7f2',
  tm5: 'https://www.figma.com/api/mcp/asset/ac0a8bbf-cc04-4a23-a36b-ff11598c60a5',
  group12: 'https://www.figma.com/api/mcp/asset/d7dcb595-338c-46fc-a25b-49b9eb62bc41',
  tm6: 'https://www.figma.com/api/mcp/asset/3dd1808c-4d35-4e71-a918-80a6809c85bf',
  patientPortal: 'https://www.figma.com/api/mcp/asset/297ea8ac-453e-4420-996a-1f71cbd5a5c6',
  vector4: 'https://www.figma.com/api/mcp/asset/b9e75080-4028-4739-b4ca-5cb5e7c5de43',
} as const;

export type LogosTheme = 'light' | 'dark';

export type LogosVariant =
  | 'EVAA'
  | 'BillingAssistant'
  | 'MaximEyes'
  | 'MaximEyes Evaa'
  | 'PatientPortal'
  | 'Scribe'
  | 'VirtualAssistant';

export interface LogosProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Light = marks for light backgrounds; dark = marks for dark backgrounds (per Figma). */
  theme?: LogosTheme;
  /** Product / lockup variant matching the design system component set. */
  variant?: LogosVariant;
}

export const Logos = React.forwardRef<HTMLDivElement, LogosProps>(function Logos(
  { className, theme = 'light', variant = 'EVAA', ...props },
  ref,
) {
  const property1 = theme === 'dark' ? 'Dark' : 'Light';
  const property2 = variant;

  const isDarkAndBillingAssistant = property1 === 'Dark' && property2 === 'BillingAssistant';
  const isDarkAndEvaa = property1 === 'Dark' && property2 === 'EVAA';
  const isDarkAndMaximEyesEvaa = property1 === 'Dark' && property2 === 'MaximEyes Evaa';
  const isDarkAndPatientPortal = property1 === 'Dark' && property2 === 'PatientPortal';
  const isDarkAndScribe = property1 === 'Dark' && property2 === 'Scribe';
  const isDarkAndVirtualAssistant = property1 === 'Dark' && property2 === 'VirtualAssistant';
  const isLightAndBillingAssistant = property1 === 'Light' && property2 === 'BillingAssistant';
  const isLightAndMaximEyes = property1 === 'Light' && property2 === 'MaximEyes';
  const isLightAndMaximEyesEvaa = property1 === 'Light' && property2 === 'MaximEyes Evaa';
  const isLightAndPatientPortal = property1 === 'Light' && property2 === 'PatientPortal';
  const isLightAndScribe = property1 === 'Light' && property2 === 'Scribe';
  const isLightAndVirtualAssistant = property1 === 'Light' && property2 === 'VirtualAssistant';
  const isMaximEyes = property2 === 'MaximEyes';

  const rootClass =
    isDarkAndMaximEyesEvaa
      ? 'w-[180px]'
      : isDarkAndEvaa
        ? 'h-[50px] py-[9px] w-[194px]'
        : isMaximEyes
          ? 'h-[50px] px-[18px] py-[6px] w-[194px]'
          : ['BillingAssistant', 'VirtualAssistant', 'Scribe'].includes(property2) ||
              isLightAndMaximEyesEvaa ||
              property2 === 'PatientPortal'
            ? 'h-[50px] w-[194px]'
            : 'h-[50px] px-[36px] py-[30px] w-[194px]';

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex flex-col content-stretch items-center justify-center',
        rootClass,
        className,
      )}
      {...props}
    >
      {property2 === 'EVAA' && (
        <div
          className={cn(
            'relative shrink-0',
            isDarkAndEvaa ? 'h-[30.533px] w-[122px]' : 'aspect-[154.99977111816406/38.79217529296875] w-full',
          )}
        >
          {property1 === 'Light' && property2 === 'EVAA' && (
            <img alt="" className="absolute block size-full max-w-none" src={ASSETS.logoEvaa} />
          )}
          {isDarkAndEvaa && (
            <>
              <div className="absolute inset-[1.13%_76.7%_0_0]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.vector} />
              </div>
              <div className="absolute inset-[0_51.84%_0.64%_24.39%]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.vector1} />
              </div>
              <div className="absolute inset-[1.44%_27.3%_1.05%_48.65%]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.vector2} />
              </div>
              <div className="absolute inset-[1.44%_0_1.05%_75.95%]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.vector3} />
              </div>
            </>
          )}
        </div>
      )}
      {property1 === 'Light' && ['BillingAssistant', 'PatientPortal'].includes(property2) && (
        <div
          className={cn(
            'relative shrink-0',
            isLightAndPatientPortal ? 'h-[27.067px] w-[172.373px]' : 'aspect-[172.3733367919922/27.06682586669922] w-full',
          )}
        >
          {isLightAndBillingAssistant && (
            <>
              <div className="absolute inset-[0_37.26%_0_0]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.logoEvaa1} />
              </div>
              <div className="absolute inset-[24.85%_0_3.13%_65.29%]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.billingAssistant} />
              </div>
              <div className="absolute inset-[3.16%_30.45%_83.01%_65.29%]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.tm} />
              </div>
            </>
          )}
          {isLightAndPatientPortal && (
            <>
              <div className="absolute contents inset-[0_30.45%_0_0]">
                <div className="absolute inset-[0_37.26%_0_0]">
                  <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group12} />
                </div>
                <div className="absolute inset-[3.16%_30.45%_83.01%_65.29%]">
                  <img alt="" className="absolute block size-full max-w-none" src={ASSETS.tm6} />
                </div>
              </div>
              <div className="absolute inset-[24.63%_7.79%_3.16%_65.2%]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.patientPortal} />
              </div>
            </>
          )}
        </div>
      )}
      {isMaximEyes && (
        <div className="relative h-[38.125px] w-[157.44px] shrink-0">
          <img
            alt=""
            className="absolute block size-full max-w-none"
            src={isLightAndMaximEyes ? ASSETS.logoLightMaximEyes1 : ASSETS.logoLightMaximEyes}
          />
        </div>
      )}
      {isLightAndVirtualAssistant && (
        <div className="relative h-[28.264px] w-[180px] shrink-0">
          <div className="absolute inset-[26.08%_7.77%_42.96%_65.54%]">
            <img alt="" className="absolute block size-full max-w-none" src={ASSETS.virtual} />
          </div>
          <div className="absolute contents inset-0">
            <div className="absolute inset-[0_37.26%_0_0]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.logoEvaa2} />
            </div>
            <div className="absolute inset-[64.68%_0_3.13%_65.29%]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.billingAssistant1} />
            </div>
            <div className="absolute inset-[3.16%_30.45%_83.01%_65.29%]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.tm1} />
            </div>
          </div>
        </div>
      )}
      {isLightAndScribe && (
        <div className="relative aspect-[194.17794799804688/27.069026947021484] w-full shrink-0">
          <div className="absolute inset-[31.41%_0_0_58.18%]">
            <img alt="" className="absolute block size-full max-w-none" src={ASSETS.scribe} />
          </div>
          <div className="absolute contents inset-[0_38.26%_0.01%_0]">
            <div className="absolute contents inset-[0_38.26%_0.01%_0]">
              <div className="absolute inset-[0_44.3%_0.01%_0]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group} />
              </div>
              <div className="absolute inset-[3.16%_38.26%_83.01%_57.96%]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.tm2} />
              </div>
            </div>
          </div>
        </div>
      )}
      {isLightAndMaximEyesEvaa && (
        <div className="relative h-[47.5px] w-[180px] shrink-0">
          <div className="absolute inset-0 overflow-clip">
            <div className="absolute inset-[0_15.54%_18.78%_0.11%]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group1} />
            </div>
            <div className="absolute inset-[76.2%_42.7%_-0.01%_33.57%]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group2} />
            </div>
            <div className="absolute inset-[77.09%_68.08%_0.63%_0]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group3} />
            </div>
            <div className="absolute inset-[14.98%_0_31.09%_84.39%]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group4} />
            </div>
          </div>
        </div>
      )}
      {isDarkAndMaximEyesEvaa && (
        <div className="relative aspect-[252/63] w-full shrink-0">
          <div className="absolute inset-0 overflow-clip">
            <div className="absolute inset-[0_15.54%_18.78%_0.11%]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group5} />
            </div>
            <div className="absolute inset-[76.2%_42.7%_-0.01%_33.57%]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group6} />
            </div>
            <div className="absolute inset-[77.09%_68.08%_0.63%_0]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group7} />
            </div>
            <div className="absolute inset-[14.98%_0_31.09%_84.39%]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group8} />
            </div>
          </div>
        </div>
      )}
      {isDarkAndBillingAssistant && (
        <div className="relative aspect-[172.3730926513672/27.06682586669922] w-full shrink-0">
          <div className="absolute inset-[0_37.26%_0_0]">
            <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group9} />
          </div>
          <div className="absolute inset-[24.85%_0_3.14%_65.29%]">
            <img alt="" className="absolute block size-full max-w-none" src={ASSETS.billingAssistant2} />
          </div>
          <div className="absolute inset-[3.16%_30.45%_83.01%_65.29%]">
            <img alt="" className="absolute block size-full max-w-none" src={ASSETS.tm3} />
          </div>
        </div>
      )}
      {isDarkAndVirtualAssistant && (
        <div className="relative aspect-[172.37362670898438/27.066862106323242] w-full shrink-0">
          <div className="absolute inset-[26.08%_7.77%_42.96%_65.54%]">
            <img alt="" className="absolute block size-full max-w-none" src={ASSETS.virtual1} />
          </div>
          <div className="absolute contents inset-0">
            <div className="absolute inset-[0_37.26%_0_0]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group10} />
            </div>
            <div className="absolute inset-[64.68%_0_3.13%_65.29%]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.billingAssistant3} />
            </div>
            <div className="absolute inset-[3.16%_30.45%_83.01%_65.29%]">
              <img alt="" className="absolute block size-full max-w-none" src={ASSETS.tm4} />
            </div>
          </div>
        </div>
      )}
      {isDarkAndScribe && (
        <div className="relative aspect-[194.17770385742188/27.069026947021484] w-full shrink-0">
          <div className="absolute inset-[31.41%_0_0_58.18%]">
            <img alt="" className="absolute block size-full max-w-none" src={ASSETS.scribe1} />
          </div>
          <div className="absolute contents inset-[0_38.26%_0.01%_0]">
            <div className="absolute contents inset-[0_38.26%_0.01%_0]">
              <div className="absolute inset-[0_44.3%_0.01%_0]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.group11} />
              </div>
              <div className="absolute inset-[3.16%_38.26%_83.01%_57.96%]">
                <img alt="" className="absolute block size-full max-w-none" src={ASSETS.tm5} />
              </div>
            </div>
          </div>
        </div>
      )}
      {isDarkAndPatientPortal && (
        <div className="relative h-[27.067px] w-[158.659px] shrink-0">
          <img alt="" className="absolute block size-full max-w-none" src={ASSETS.vector4} />
        </div>
      )}
    </div>
  );
});

Logos.displayName = 'Logos';
