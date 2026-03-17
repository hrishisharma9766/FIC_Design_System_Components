import React, { useState } from 'react';
import { BaseButton } from './components/BaseButton';
import { PillBadge } from './components/PillBadge';
import { StateBadge } from './components/StateBadge';
import { ProgressBar } from './components/ProgressBar';
import { Checkbox } from './components/Checkbox';
import { DatePicker } from './components/DatePicker';
import { SingleSelectDropDown } from './components/DropDown';
import { InputField, InputField_Phone } from './components/InputFields';
import { EvaaTable } from './components/Table';
import { TimePicker } from './components/TimePicker';

function App() {
  const [dropdownValue, setDropdownValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const tableData = [
    {
      id: '1',
      location: 'North Clinic',
      accountId: 'ACC-001',
      acceptorId: 'ACCP-101',
      acceptorToken: 'TK-7788',
      actionType: 'edit-cancel' as const,
    },
    {
      id: '2',
      location: 'South Clinic',
      accountId: 'ACC-002',
      acceptorId: 'ACCP-102',
      acceptorToken: 'TK-9922',
      actionType: 'save-cancel' as const,
      alternateBackground: true,
    },
    {
      id: '3',
      location: 'West Medical',
      accountId: 'ACC-003',
      acceptorId: 'ACCP-103',
      acceptorToken: 'TK-1144',
      isEditingAccountId: true,
    },
  ];

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const [checkedItems, setCheckedItems] = useState({
    default: false,
    hover: false,
    focus: true,
    disabled: false,
    readonly: true,
    standard: false,
    checkedSubtext: true,
    radioDefault: false,
    radioChecked: true,
  });

  const toggleChecked = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
  };

  return (
    <div className="min-h-screen bg-muted/30 p-8 font-sans">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-foreground mb-2">Evaa Design System</h1>
        <p className="text-secondary">Showcase of all components on a single page</p>
      </header>

      <div className="space-y-12">
        {/* Buttons Section (Now using BaseButton) */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Base Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <BaseButton size="sm" variant="primary">Primary Button (SM)</BaseButton>
            <BaseButton variant="secondary">Secondary Button</BaseButton>
            <BaseButton variant="brand">Brand Button</BaseButton>
            <BaseButton size="lg" variant="success">Success Button (LG)</BaseButton>
          </div>
          <div className="flex flex-wrap gap-4 items-center mt-6">
            <BaseButton disabled variant="primary">Primary Disabled</BaseButton>
            <BaseButton disabled variant="secondary">Secondary Disabled</BaseButton>
            <BaseButton disabled variant="brand">Brand Disabled</BaseButton>
            <BaseButton disabled variant="success">Success Disabled</BaseButton>
          </div>
        </section>

        {/* BaseButton (New) Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">BaseButton (Encapsulated CSS)</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Variants</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <BaseButton variant="primary">Primary</BaseButton>
                <BaseButton variant="secondary">Secondary</BaseButton>
                <BaseButton variant="brand">Brand</BaseButton>
                <BaseButton variant="success">Success</BaseButton>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-end">
                <BaseButton size="sm">Small (36px)</BaseButton>
                <BaseButton size="md">Medium (48px)</BaseButton>
                <BaseButton size="lg">Large (72px)</BaseButton>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">States & Icons</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <BaseButton isLoading>Loading</BaseButton>
                <BaseButton disabled>Disabled</BaseButton>
                <BaseButton variant="secondary" disabled>Secondary Disabled</BaseButton>
                <BaseButton leftIcon="plus">With Left Icon</BaseButton>
                <BaseButton variant="brand" rightIcon="arrow-right">With Right Icon</BaseButton>
                <BaseButton variant="success" leftIcon="check" rightIcon="chevron-down">Double Icons</BaseButton>
              </div>
            </div>
          </div>
        </section>

        {/* PillBadge Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Badges</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Pill Badges (Standard)</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <PillBadge variant="blue" size="sm">Eligibility Verification (SM)</PillBadge>
                <PillBadge variant="fuchsia" size="md">Eligibility Verification (MD)</PillBadge>
                <PillBadge variant="lime" size="md">Eligibility Verification (Lime)</PillBadge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Pill Badges (Stacked)</h3>
              <div className="flex flex-wrap gap-6 items-end">
                <PillBadge 
                  stacked 
                  variant="blue" 
                  size="md" 
                  subtext="Most practices start here"
                >
                  Recommended
                </PillBadge>
                <PillBadge 
                  stacked 
                  variant="lime" 
                  size="lg" 
                  subtext="Most practices start here"
                >
                  Recommended (LG)
                </PillBadge>
                <PillBadge 
                  stacked 
                  variant="fuchsia" 
                  size="lg" 
                  subtext="Most practices start here"
                >
                  Recommended (Fuchsia)
                </PillBadge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">State Badges (With Icons)</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <StateBadge variant="active" icon="check">Active</StateBadge>
                <StateBadge variant="active">Active (No Icon)</StateBadge>
                <StateBadge variant="inactive" icon="plus">Inactive</StateBadge>
                <StateBadge variant="inactive">Inactive (No Icon)</StateBadge>
              </div>
            </div>
          </div>
        </section>

        {/* ProgressBar Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Progress Bars</h2>
          <div className="space-y-10">
            <div className="max-w-md">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Sizes (4px, 10px, 16px)</h3>
              <div className="space-y-6">
                <ProgressBar 
                  size="sm" 
                  percentage={60} 
                  label="Encounters This Month" 
                  usedText="742 used" 
                  remainingText="258 remaining" 
                />
                <ProgressBar 
                  size="md" 
                  percentage={74} 
                  label="Encounters This Month" 
                  usedText="742 used" 
                  remainingText="258 remaining" 
                />
                <ProgressBar 
                  size="lg" 
                  percentage={74} 
                  label="Encounters This Month" 
                  usedText="742 used" 
                  remainingText="258 remaining" 
                />
              </div>
            </div>

            <div className="max-w-md">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Variants (Default & High Usage)</h3>
              <div className="space-y-6">
                <ProgressBar 
                  variant="default" 
                  percentage={45} 
                  label="Default Variant" 
                />
                <ProgressBar 
                  variant="high-usage" 
                  percentage={90} 
                  label="High Usage Variant" 
                />
              </div>
            </div>

            <div className="max-w-md">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Card Mode (withCard)</h3>
              <div className="space-y-6">
                <ProgressBar 
                  withCard
                  size="sm" 
                  percentage={74} 
                  label="Encounters This Month" 
                  usedText="742 used" 
                  remainingText="258 remaining" 
                />
                <ProgressBar 
                  withCard
                  variant="high-usage"
                  size="md" 
                  percentage={90} 
                  label="Usage Alert" 
                  usedText="900 used" 
                  remainingText="100 remaining" 
                />
              </div>
            </div>

            <div className="max-w-md">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Custom Width (width prop)</h3>
              <div className="space-y-6">
                <ProgressBar 
                  width="100%"
                  percentage={30} 
                  label="Full Width (100%)" 
                />
                <ProgressBar 
                  width={350}
                  percentage={60} 
                  label="Fixed Width (350px)" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Checkbox Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Checkboxes</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Standard Checkboxes</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <Checkbox 
                  label="Default" 
                  checked={checkedItems.default} 
                  onChange={() => toggleChecked('default')} 
                />
                <Checkbox 
                  label="Hover State" 
                  state="hover" 
                  checked={checkedItems.hover} 
                  onChange={() => toggleChecked('hover')} 
                />
                <Checkbox 
                  label="Focus State" 
                  state="focus" 
                  checked={checkedItems.focus} 
                  onChange={() => toggleChecked('focus')} 
                />
                <Checkbox 
                  label="Disabled" 
                  state="disabled" 
                  checked={checkedItems.disabled} 
                  onChange={() => toggleChecked('disabled')} 
                />
                <Checkbox 
                  label="Read Only Checked" 
                  state="readonly" 
                  checked={checkedItems.readonly} 
                  onChange={() => toggleChecked('readonly')} 
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Checkboxes with Subtext</h3>
              <div className="flex flex-wrap gap-8 items-start">
                <Checkbox 
                  label="Standard" 
                  subtext="Supporting subtext here" 
                  checked={checkedItems.standard} 
                  onChange={() => toggleChecked('standard')} 
                />
                <Checkbox 
                  label="Checked Subtext" 
                  subtext="Task completed description" 
                  checked={checkedItems.checkedSubtext} 
                  onChange={() => toggleChecked('checkedSubtext')} 
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Circular (Radio) Variants</h3>
              <div className="flex flex-wrap gap-8 items-start">
                <Checkbox 
                  variant="round" 
                  label="Radio Default" 
                  checked={checkedItems.radioDefault} 
                  onChange={() => toggleChecked('radioDefault')} 
                />
                <Checkbox 
                  variant="round" 
                  label="Radio Checked" 
                  checked={checkedItems.radioChecked} 
                  onChange={() => toggleChecked('radioChecked')} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Date Picker Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Date Picker</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Single Date Selection States</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-end">
                <DatePicker 
                  label="Default" 
                  placeholder="Select Date" 
                />
                <DatePicker 
                  label="Hover" 
                  state="hover"
                  placeholder="Hover State" 
                />
                <DatePicker 
                  label="Focus" 
                  state="focus"
                  placeholder="Focus State" 
                />
                <DatePicker 
                  label="Disabled" 
                  state="disabled"
                  placeholder="Disabled State" 
                />
                <DatePicker 
                  label="Read Only" 
                  state="readonly"
                  value="2024-03-16"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Date Range Selection</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                <DatePicker 
                  label="Range Picker (Empty)" 
                  mode="range"
                  placeholder="Select Range" 
                  required
                />
                <DatePicker 
                  label="Range Picker (With Value)" 
                  mode="range"
                  value={['2024-03-01', '2024-03-15']}
                  required
                />
              </div>
            </div>
          </div>
        </section>

        {/* Input Fields Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Input Fields</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InputField 
              label="Standard Input" 
              placeholder="Type something..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="This is a helper text"
            />
            <InputField 
              label="Input with Error" 
              placeholder="Invalid value" 
              error="This field is required"
              value=""
              onChange={() => {}}
            />
            <InputField 
              label="Disabled Input" 
              placeholder="I am disabled" 
              disabled 
              value=""
              onChange={() => {}}
            />
            <InputField 
              label="Input with Prefix" 
              placeholder="Username" 
              prefix="user"
              value=""
              onChange={() => {}}
            />
            <InputField_Phone 
              label="Phone Input" 
              placeholder="(555) 000-0000"
              value=""
              onChange={() => {}}
            />
            <InputField 
              label="Password" 
              type="password"
              placeholder="Enter password"
              rightIcon="eye"
              value=""
              onChange={() => {}}
            />
          </div>
        </section>

        {/* Dropdowns Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Dropdowns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <SingleSelectDropDown 
              label="Small Dropdown" 
              size="small"
              options={dropdownOptions}
              value={dropdownValue}
              onChange={setDropdownValue}
            />
            <SingleSelectDropDown 
              label="Medium Dropdown" 
              size="medium"
              options={dropdownOptions}
              value={dropdownValue}
              onChange={setDropdownValue}
            />
            <SingleSelectDropDown 
              label="Large Dropdown" 
              size="large"
              options={dropdownOptions}
              value={dropdownValue}
              onChange={setDropdownValue}
            />
          </div>
        </section>

        {/* Time Picker Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Time Picker</h2>
          <div className="flex flex-wrap gap-8 items-start">
            <TimePicker label="Select Time (12h)" format="12h" />
            <TimePicker label="Select Time (24h)" format="24h" />
            <TimePicker label="Range Picker" type="range" />
          </div>
        </section>

        {/* Table Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Data Table</h2>
          <EvaaTable data={tableData} showHeaderCheckbox={true} title="Location Management" />
        </section>
      </div>
    </div>
  );
}

export default App;
