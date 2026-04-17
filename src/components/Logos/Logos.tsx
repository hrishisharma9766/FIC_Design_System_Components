import * as React from 'react';
import { cn } from '../../lib/utils';

import logoDarkBillingAssistant from './logos/logo-dark-billing-assistance.svg';
import logoDarkEvaa from './logos/logo-dark-evaa.svg';
import logoDarkMaximEyesEvaa from './logos/logo-dark-maximeyes-evaa.svg';
import logoDarkMaximEyes from './logos/logo-dark-maximeyes.svg';
import logoDarkPatientPortal from './logos/logo-dark-patient-portal.svg';
import logoDarkScribe from './logos/logo-dark-scribe.svg';
import logoDarkVirtualAssistant from './logos/logo-dark-virtual-assistant.svg';
import logoLightBillingAssistant from './logos/logo-light-billing-assistance.svg';
import logoLightEvaa from './logos/logo-light-evaa.svg';
import logoLightMaximEyesEvaa from './logos/logo-light-maximeyes-evaa.svg';
import logoLightMaximEyes from './logos/logo-light-maximeyes.svg';
import logoLightPatientPortal from './logos/logo-light-patient-portal.svg';
import logoLightScribe from './logos/logo-light-scribe.svg';
import logoLightVirtualAssistant from './logos/logo-light-virtual-assistant.svg';

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

const LOGO_ASSETS = {
  light: {
    EVAA: logoLightEvaa,
    BillingAssistant: logoLightBillingAssistant,
    VirtualAssistant: logoLightVirtualAssistant,
    Scribe: logoLightScribe,
    PatientPortal: logoLightPatientPortal,
    MaximEyes: logoLightMaximEyes,
    'MaximEyes Evaa': logoLightMaximEyesEvaa,
  },
  dark: {
    EVAA: logoDarkEvaa,
    BillingAssistant: logoDarkBillingAssistant,
    VirtualAssistant: logoDarkVirtualAssistant,
    Scribe: logoDarkScribe,
    PatientPortal: logoDarkPatientPortal,
    MaximEyes: logoDarkMaximEyes,
    'MaximEyes Evaa': logoDarkMaximEyesEvaa,
  },
} satisfies Record<LogosTheme, Record<LogosVariant, string>>;

export const Logos = React.forwardRef<HTMLDivElement, LogosProps>(function Logos(
  { className, theme = 'light', variant = 'EVAA', ...props },
  ref,
) {
  const isDark = theme === 'dark';
  const isMaximEyes = variant === 'MaximEyes';
  const isDarkAndEvaa = isDark && variant === 'EVAA';
  const isDarkAndMaximEyesEvaa = isDark && variant === 'MaximEyes Evaa';
  const isLightAndMaximEyesEvaa = !isDark && variant === 'MaximEyes Evaa';

  const rootClass =
    isDarkAndMaximEyesEvaa
      ? 'w-[180px]'
      : isDarkAndEvaa
        ? 'h-[50px] py-[9px] w-[194px]'
        : isMaximEyes
          ? 'h-[50px] px-[18px] py-[6px] w-[194px]'
          : ['BillingAssistant', 'VirtualAssistant', 'Scribe'].includes(variant) ||
              isLightAndMaximEyesEvaa ||
              variant === 'PatientPortal'
            ? 'h-[50px] w-[194px]'
            : 'h-[50px] px-[36px] w-[194px]';

  const logoWrapperClass = React.useMemo(() => {
    if (variant === 'EVAA') {
      return isDarkAndEvaa
        ? 'h-[30.533px] w-[122px]'
        : 'aspect-[154.99977111816406/38.79217529296875] w-full';
    }

    if (variant === 'BillingAssistant') {
      return isDark
        ? 'aspect-[172.3730926513672/27.06682586669922] w-full'
        : 'aspect-[172.3733367919922/27.06682586669922] w-full';
    }

    if (variant === 'VirtualAssistant') {
      return isDark
        ? 'aspect-[172.37362670898438/27.066862106323242] w-full'
        : 'h-[28.264px] w-[180px]';
    }

    if (variant === 'Scribe') {
      return isDark
        ? 'aspect-[194.17770385742188/27.069026947021484] w-full'
        : 'aspect-[194.17794799804688/27.069026947021484] w-full';
    }

    if (variant === 'MaximEyes') {
      return 'h-[38.125px] w-[157.44px]';
    }

    if (variant === 'MaximEyes Evaa') {
      return isDark ? 'aspect-[252/63] w-full' : 'h-[47.5px] w-[180px]';
    }

    if (variant === 'PatientPortal') {
      return isDark ? 'h-[27.067px] w-[158.659px]' : 'h-[27.067px] w-[172.373px]';
    }

    return 'w-full';
  }, [variant, isDark, isDarkAndEvaa]);

  const logoSrc = LOGO_ASSETS[theme][variant];

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
      <div className={cn('relative shrink-0', logoWrapperClass)}>
        <img alt="" className="absolute block size-full max-w-none" src={logoSrc} />
      </div>
    </div>
  );
});

Logos.displayName = 'Logos';
