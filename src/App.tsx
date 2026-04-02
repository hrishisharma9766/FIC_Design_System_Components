import { useState } from 'react';
import {
  Button,
  Checkbox,
  DatePicker,
  InputField,
  InputFieldIcon,
  InputFieldPhone,
  PillBadge,
  ProgressBar,
  RadioButton,
  SearchBox,
  SimpleTable,
  StateBadge,
  Switch,
  SwitchWithLabel,
  Table,
  TextArea,
  AdminTopNav,
  NavigationDropDown,
  AudioPlayer,
  LinkButton,
  NotificationDropDownMenu,
  SimpleTab,
  AddOnsCard,
  SingleSelectDropDown,
  MultiSelectDropDown
} from './index';

function App() {
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

  const [selectedTableItems, setSelectedTableItems] = useState<any[]>([]);
  const [selectedSimpleTableItems, setSelectedSimpleTableItems] = useState<any[]>([]);
  const [simpleVariant, setSimpleVariant] = useState<'default' | 'striped'>('striped');

  const toggleChecked = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
  };

  const handleRowSelect = (item: any, isSelected: boolean) => {
    if (isSelected) {
      setSelectedTableItems(prev => [...prev, item]);
    } else {
      setSelectedTableItems(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleSimpleRowSelect = (item: any, isSelected: boolean) => {
    if (isSelected) {
      setSelectedSimpleTableItems(prev => [...prev, item]);
    } else {
      setSelectedSimpleTableItems(prev => prev.filter(i => i.id !== item.id));
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 font-sans">
      <AdminTopNav 
        leftSelects={[
          { 
            placeholder: "Enterprise Optical Group", 
            options: [
              { label: "Practice 1", value: "Practice 1" },
              { label: "Practice 2", value: "Practice 2" }
            ] 
          },
          { 
            placeholder: "Virtual Assistant", 
            options: [
              { label: "Assistant A", value: "Assistant A" },
              { label: "Assistant B", value: "Assistant B" }
            ] 
          }
        ]}
        actions={[
          { icon: <div className="w-4 h-4 bg-gray-400 rounded-full" />, badge: 3 },
          { icon: <div className="w-4 h-4 bg-gray-400 rounded-full" /> }
        ]}
        profileAction={{
          label: "John Doe",
          items: [
            { label: "Profile", onClick: () => console.log("Profile clicked") },
            { label: "Settings", onClick: () => console.log("Settings clicked") },
            { label: "Logout", onClick: () => console.log("Logout clicked") }
          ]
        }}
      />
      <div className="p-8">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-foreground mb-2">Evaa Design System</h1>
          <p className="text-secondary">Showcase of all components on a single page</p>
        </header>

      <div className="space-y-12">
        {/* Buttons Section (Now using Button) */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm" variant="primary">Primary Button (SM)</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="brand">Brand Button</Button>
            <Button size="lg" variant="success">Success Button (LG)</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center mt-6">
            <Button disabled variant="primary">Primary Disabled</Button>
            <Button disabled variant="secondary">Secondary Disabled</Button>
            <Button disabled variant="brand">Brand Disabled</Button>
            <Button disabled variant="success">Success Disabled</Button>
          </div>
        </section>

        {/* Button (New) Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Button (Encapsulated CSS)</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Variants</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="brand">Brand</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-end">
                <Button size="sm">Small (36px)</Button>
                <Button size="md">Medium (48px)</Button>
                <Button size="lg">Large (72px)</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">States & Icons</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button variant="secondary" disabled>Secondary Disabled</Button>
                <Button leftIcon="plus">With Left Icon</Button>
                <Button variant="brand" rightIcon="arrow-right">With Right Icon</Button>
                <Button variant="success" leftIcon="check" rightIcon="chevron-down">Double Icons</Button>
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

        {/* InputField Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">InputField</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Default State</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputField label="Default Input" placeholder="Enter your text here" />
                <InputField label="With Helper Text" placeholder="Enter your text here" helperText="This is helper text" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputField size="sm" label="Small Input" placeholder="Small size" />
                <InputField size="md" label="Medium Input" placeholder="Medium size" />
                <InputField size="lg" label="Large Input" placeholder="Large size" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">States</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputField state="default" label="Default" placeholder="Default state" />
                <InputField state="hover" label="Hover" placeholder="Hover state" />
                <InputField state="focus" label="Focus" placeholder="Focus state" />
                <InputField state="error" label="Error" placeholder="Error state" errorText="This field is required" />
                <InputField state="disabled" label="Disabled" placeholder="Disabled" disabled />
                <InputField state="readonly" label="Read Only" placeholder="Read only" readOnly value="Read only value" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">With Required & Character Count</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputField label="Required Field" placeholder="This field is required" required />
                <InputField label="With Character Count" placeholder="Max 50 characters" maxLength={50} currentLength={20} showCharacterCount />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">With Icons</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputField 
                  label="With Left Icon" 
                  placeholder="Search..." 
                  leftIcon={<span>🔍</span>} 
                />
                <InputField 
                  label="With Right Icon" 
                  placeholder="Enter amount" 
                  rightIcon={<span>💵</span>} 
                />
                <InputField 
                  label="With Both Icons" 
                  placeholder="Search and clear" 
                  leftIcon={<span>🔍</span>}
                  rightIcon={<span>✕</span>} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* InputFieldIcon Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">InputFieldIcon</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Default State</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputFieldIcon label="Percentage Off" placeholder="Select Percentage" prefixIcon={<span>📅</span>} />
                <InputFieldIcon label="With Helper Text" placeholder="Select Percentage" helperText="This is helper text" prefixIcon={<span>📅</span>} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">States</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputFieldIcon state="default" label="Default" placeholder="Select" prefixIcon={<span>📅</span>} />
                <InputFieldIcon state="hover" label="Hover" placeholder="Select" prefixIcon={<span>📅</span>} />
                <InputFieldIcon state="selected" label="Selected" placeholder="Select" prefixIcon={<span>📅</span>} />
                <InputFieldIcon state="error" label="Error" placeholder="Select" errorText="This field is required" prefixIcon={<span>📅</span>} />
                <InputFieldIcon state="disabled" label="Disabled" placeholder="Select" disabled prefixIcon={<span>📅</span>} />
                <InputFieldIcon state="readonly" label="Read Only" placeholder="Select" readOnly prefixIcon={<span>📅</span>} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">With Required & Character Count</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputFieldIcon label="Required Field" placeholder="Select Percentage" required prefixIcon={<span>📅</span>} />
                <InputFieldIcon label="With Character Count" placeholder="Select Percentage" maxLength={140} currentLength={1} showCharacterCount prefixIcon={<span>📅</span>} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">With Prefix Icon</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputFieldIcon
                  label="With Prefix Icon"
                  placeholder="Select..."
                  prefixIcon={<span>📅</span>}
                />
              </div>
            </div>
          </div>
        </section>

        {/* InputFieldPhone Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">InputFieldPhone</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputFieldPhone size="sm" label="Small Input" placeholder="Small size" />
                <InputFieldPhone size="md" label="Medium Input" placeholder="Medium size" />
                <InputFieldPhone size="lg" label="Large Input" placeholder="Large size" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">States</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputFieldPhone state="default" label="Default" placeholder="Default state" />
                <InputFieldPhone state="hover" label="Hover" placeholder="Hover state" />
                <InputFieldPhone state="selected" label="Selected" placeholder="Selected state" />
                <InputFieldPhone state="error" label="Error" placeholder="Error state" errorText="This field is required" />
                <InputFieldPhone state="disabled" label="Disabled" placeholder="Disabled" disabled />
                <InputFieldPhone state="readonly" label="Read Only" placeholder="Read only" readOnly value="Read only value" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">With Required & Character Count</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputFieldPhone label="Required Field" placeholder="This field is required" required />
                <InputFieldPhone label="With Character Count" placeholder="Max 140 characters" maxLength={140} currentLength={1} showCharacterCount />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">With Prefix Value</h3>
              <div className="flex flex-wrap gap-4 items-start">
                <InputFieldPhone
                  label="Phone Number"
                  placeholder="Select..."
                  prefixValue="+126"
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

        {/* Radio Button Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Radio Buttons</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Standard Radio Buttons</h3>
              <div className="flex flex-wrap gap-8 items-start">
                <RadioButton 
                  label="Default" 
                  name="radio-group-1"
                  checked={checkedItems.radioDefault} 
                  onChange={() => setCheckedItems(prev => ({ ...prev, radioDefault: true, radioChecked: false }))} 
                />
                <RadioButton 
                  label="Checked" 
                  name="radio-group-1"
                  checked={checkedItems.radioChecked} 
                  onChange={() => setCheckedItems(prev => ({ ...prev, radioChecked: true, radioDefault: false }))} 
                />
                <RadioButton 
                  label="Disabled"
                  disabled
                  checked={false} 
                />
                <RadioButton 
                  label="Read Only" 
                  readOnly
                  checked={true} 
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Radio Buttons with Subtext</h3>
              <div className="flex flex-wrap gap-12 items-start">
                <RadioButton 
                  label="Label" 
                  subtext="Subtext"
                  name="radio-group-2"
                  checked={checkedItems.radioDefault}
                  onChange={() => setCheckedItems(prev => ({ ...prev, radioDefault: true, radioChecked: false }))}
                />
                <RadioButton 
                  label="Label" 
                  subtext="Subtext"
                  name="radio-group-2"
                  checked={checkedItems.radioChecked}
                  onChange={() => setCheckedItems(prev => ({ ...prev, radioChecked: true, radioDefault: false }))}
                />
                <RadioButton 
                  label="Label" 
                  subtext="Subtext"
                  disabled
                  name="radio-group-2"
                  checked={checkedItems.radioChecked}
                  onChange={() => setCheckedItems(prev => ({ ...prev, radioChecked: true, radioDefault: false }))}
                />
                <RadioButton 
                  label="Label" 
                  subtext="Subtext"
                  readOnly
                  name="radio-group-2"
                  checked={checkedItems.radioChecked}
                  onChange={() => setCheckedItems(prev => ({ ...prev, radioChecked: true, radioDefault: false }))}
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

        {/* SearchBox Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Search Box</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Standard Search Box</h3>
              <div className="flex flex-col gap-6 max-w-md">
                <SearchBox placeholder="Search by whatever thing..." />
                <SearchBox placeholder="Search (Hover state)" className="search-box--hover" />
                <SearchBox placeholder="Search (Disabled state)" disabled />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Collapsible Search Box</h3>
              <div className="flex gap-6 items-center">
                <SearchBox collapsible placeholder="Click to expand..." />
                <SearchBox collapsible disabled placeholder="Collapsible disabled" />
              </div>
            </div>
          </div>
        </section>

        {/* Switch Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Switch Components</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Color Variants & Sizes</h3>
              <div className="flex flex-wrap gap-12 items-end">
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Teal (Big)</span>
                  <Switch colorVariant="teal" size="big" defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Fusia (Big)</span>
                  <Switch colorVariant="fusia" size="big" defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Green (Big)</span>
                  <Switch colorVariant="green" size="big" defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Red (Big)</span>
                  <Switch colorVariant="red" size="big" defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Green/Red (Big)</span>
                  <Switch colorVariant="green-red" size="big" defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Teal (Small)</span>
                  <Switch colorVariant="teal" size="small" defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Fusia (Small)</span>
                  <Switch colorVariant="fusia" size="small" defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Green (Small)</span>
                  <Switch colorVariant="green" size="small" defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Red (Small)</span>
                  <Switch colorVariant="red" size="small" defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Green/Red (Small)</span>
                  <Switch colorVariant="green-red" size="small" defaultChecked />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">States</h3>
              <div className="flex flex-wrap gap-12 items-end">
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Default (Inactive)</span>
                  <Switch />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Default (Active)</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Disabled (Inactive)</span>
                  <Switch disabled />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Disabled (Active)</span>
                  <Switch disabled defaultChecked />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Read Only (Inactive)</span>
                  <Switch readOnly />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Read Only (Active)</span>
                  <Switch readOnly defaultChecked />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">With Labels & Badges</h3>
              <div className="space-y-8">
                <SwitchWithLabel 
                  label="Main Label:" 
                  inactiveLabel="Value 1" 
                  activeLabel="Value 2" 
                />
                <SwitchWithLabel 
                  label="Main Label:" 
                  inactiveLabel="Value 1" 
                  activeLabel="Value 2" 
                  defaultChecked 
                />
                <SwitchWithLabel 
                  label="Offer Switch:" 
                  inactiveLabel="Standard" 
                  activeLabel="Premium" 
                  offerText="Save 20%" 
                  defaultChecked 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Table Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Table</h2>
          <div className="space-y-8">
            <h3 className="text-lg font-semibold mb-2">Table with Heading & Button</h3>
            <Table 
              title="Location Credentials"
              subtitle="No location credentials have been set up. To get started, create a new token."
              actionButton={{ label: "Create New Token", onClick: () => alert('Create New Token Clicked') }}
              columns={[
                { header: "Location Name", accessor: "name", width: 250 },
                { header: "Account Id", accessor: "accountId" },
                { header: "Acceptor ID", accessor: "acceptorId" },
                { header: "Acceptor Token", accessor: "token" },
                { 
                  header: "Actions", 
                  accessor: (item: any) => (
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => alert(`Editing ${item.name}`)}>Edit</Button>
                      <Button size="sm" variant="secondary" onClick={() => alert(`Deleting ${item.name}`)}>Delete</Button>
                    </div>
                  )
                }
              ]}
              data={[
                { id: 1, name: "Downtown Center", accountId: "ACC001", acceptorId: "ACP001", token: "TOK001" },
                { id: 2, name: "Westside Vision", accountId: "ACC002", acceptorId: "ACP002", token: "*****" },
                { id: 3, name: "Eastgate Eye Care", accountId: "ACC003", acceptorId: "ACP003", token: "*****" },
                { id: 4, name: "Northpark Eyewear", accountId: "Not set", acceptorId: "Not set", token: "Not set" },
                { id: 5, name: "Downtown Center", accountId: "ACC005", acceptorId: "ACP005", token: "*****" },
              ]}
              onRowSelect={handleRowSelect}
              selectedItems={selectedTableItems}
            />

            <h3 className="text-lg font-semibold mt-8 mb-2">Table without Heading & Button (SimpleTable)</h3>
            <div className="mb-4 flex gap-4">
              <Button size="sm" onClick={() => setSimpleVariant(simpleVariant === 'striped' ? 'default' : 'striped')}>
                Toggle Variant: {simpleVariant}
              </Button>
            </div>
            <SimpleTable 
              variant={simpleVariant as 'default' | 'striped'}
              isResponsive={true}
              onColumnSort={(key, dir) => console.log(`Sorting ${key} by ${dir}`)}
              columns={[
                { header: "Location Name", accessor: "name", width: 250, isSortable: true, sortDirection: 'asc' },
                { header: "Account Id", accessor: "accountId", isSortable: true },
                { header: "Acceptor ID", accessor: "acceptorId", isSortable: true },
                { header: "Acceptor Token", accessor: "token" },
                { 
                  header: "Actions", 
                  accessor: (item: any) => (
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => alert(`Editing ${item.name}`)}>Edit</Button>
                      <Button size="sm" variant="secondary" onClick={() => alert(`Deleting ${item.name}`)}>Delete</Button>
                    </div>
                  )
                }
              ]}
              data={[
                { id: 1, name: "Downtown Center", accountId: "ACC001", acceptorId: "ACP001", token: "TOK001" },
                { id: 2, name: "Westside Vision", accountId: "ACC002", acceptorId: "ACP002", token: "*****" },
                { id: 3, name: "Eastgate Eye Care", accountId: "ACC003", acceptorId: "ACP003", token: "*****" },
                { id: 4, name: "Northpark Eyewear", accountId: "Not set", acceptorId: "Not set", token: "Not set" },
                { id: 5, name: "Downtown Center", accountId: "ACC005", acceptorId: "ACP005", token: "*****" },
              ]}
              onRowSelect={handleSimpleRowSelect}
              selectedItems={selectedSimpleTableItems}
              noDataMessage="Custom no data message"
            />

            <h3 className="text-lg font-semibold mt-8 mb-2">SimpleTable - No Data Variant</h3>
            <SimpleTable 
              columns={[
                { header: "Location Name", accessor: "name", width: 250 },
                { header: "Account Id", accessor: "accountId" },
                { header: "Acceptor ID", accessor: "acceptorId" },
                { header: "Acceptor Token", accessor: "token" },
              ]}
              data={[]}
              noDataMessage="No location credentials found. Please add a new one."
            />
          </div>
        </section>

        {/* AudioPlayer Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">AudioPlayer</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Long Variant</h3>
              <div className="w-[824px]">
                <AudioPlayer
                  variant="long"
                  currentTime={30}
                  duration={83}
                  isPlaying={false}
                  isMuted={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Short Variant</h3>
              <div>
                <AudioPlayer
                  variant="short"
                  currentTime={15}
                  duration={83}
                  isPlaying={true}
                  isMuted={false}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Disabled State</h3>
              <div className="w-full max-w-md">
                <AudioPlayer
                  variant="long"
                  currentTime={45}
                  duration={83}
                  isPlaying={false}
                  disabled
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Muted State</h3>
              <div className="w-full max-w-md">
                <AudioPlayer
                  variant="long"
                  currentTime={60}
                  duration={83}
                  isPlaying={true}
                  isMuted={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* LinkButton Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">LinkButton</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Warning Variant</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <LinkButton variant="warning">View Licenses & Billing</LinkButton>
                <LinkButton variant="warning" filled>View Licenses & Billing</LinkButton>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Error Variant</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <LinkButton variant="error">View Licenses & Billing</LinkButton>
                <LinkButton  variant="error" filled>View Licenses & Billing</LinkButton>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Disabled Variant</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <LinkButton variant="disabled">View Licenses & Billing</LinkButton>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">ReadOnly Variant</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <LinkButton variant="readonly">View Licenses & Billing</LinkButton>
                <LinkButton variant="readonly" filled>View Licenses & Billing</LinkButton>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Teal Variant</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <LinkButton variant="teal">View Licenses & Billing</LinkButton>
                <LinkButton variant="teal" filled>View Licenses & Billing</LinkButton>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Brand Variant</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <LinkButton variant="brand">View Licenses & Billing</LinkButton>
                <LinkButton variant="brand" filled>View Licenses & Billing</LinkButton>
              </div>
            </div>
          </div>
        </section>

        {/* NotificationDropDownMenu Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Notification Center</h2>
          <div className="flex flex-wrap gap-4 items-start relative min-h-[500px]">
            <NotificationDropDownMenu notifications={[
              {
                id: '1',
                type: 'warning',
                subject: 'Billing Assistant',
                heading: 'Trial will end in 5 days.',
                body: 'Upgrade to continue using all feature.',
                time: '10 minutes ago',
                isNew: true,
              },
              {
                id: '2',
                type: 'error',
                subject: 'Billing Assistant',
                heading: 'Trial will end in 5 days.',
                body: 'Upgrade to continue using all feature.',
                time: '10 minutes ago',
                isNew: true,
              },
              {
                id: '3',
                type: 'warning',
                subject: 'Billing Assistant',
                heading: 'Trial will end in 5 days.',
                body: 'Upgrade to continue using all feature.',
                time: '10 minutes ago',
                isNew: false,
                read: true,
              }
            ]} />
          </div>
        </section>

        {/* SimpleTab Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">SimpleTab</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Theme Variants (Click to Interact)</h3>
              <div className="flex flex-wrap gap-12">
                <div>
                  <h4 className="text-xs text-muted-foreground mb-2">Fusia</h4>
                  <SimpleTab tabs="two-tabs" theme="fusia" />
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground mb-2">Neutral</h4>
                  <SimpleTab tabs="two-tabs" theme="neutral" />
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground mb-2">Teal</h4>
                  <SimpleTab tabs="two-tabs" theme="teal" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Tab Count Variants (Click to Interact)</h3>
              <div className="flex flex-wrap gap-12">
                <div>
                  <h4 className="text-xs text-muted-foreground mb-2">Two Tabs</h4>
                  <SimpleTab tabs="two-tabs" theme="neutral" />
                </div>
                <div>
                  <h4 className="text-xs text-muted-foreground mb-2">More Than 2 Tabs</h4>
                  <SimpleTab tabs="more-than-2-tabs" theme="neutral" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Controlled with State Display</h3>
              <SimpleTab
                tabs="two-tabs"
                theme="teal"
                onTabChange={(tab) => console.log('Selected tab:', tab)}
              />
              <p className="text-sm text-muted-foreground mt-2">Check console for tab changes</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">More Than 2 Tabs with Fusia Theme</h3>
              <SimpleTab
                tabs="more-than-2-tabs"
                theme="fusia"
              />
            </div>
          </div>
        </section>

        {/* AddOnsCard Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">AddOnsCard</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Card with More Than 1 Option</h3>
              <AddOnsCard
                title="Eligibility Verification"
                variant="more-than-1-option"
                options={[
                  { id: '1', verifications: '250 Verifications', price: '$125', provider: 'provider/month' },
                  { id: '2', verifications: '500 Verifications', price: '$250', provider: 'provider/month' },
                ]}
                onAdd={(id) => console.log('Added option:', id)}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Card with 1 Option</h3>
              <AddOnsCard
                title="Eligibility Verification"
                variant="1-option"
                options={[
                  { id: '1', verifications: '250 Verifications', price: '$125', provider: 'provider/month' },
                ]}
                onAdd={(id) => console.log('Added option:', id)}
              />
            </div>
          </div>
        </section>

        {/* SingleSelectDropDown Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Single Select Drop Down</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-8 items-start">
                <SingleSelectDropDown
                  size="sm"
                  label="Small Input"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                />
                <SingleSelectDropDown
                  size="md"
                  label="Medium Input"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                />
                <SingleSelectDropDown
                  size="lg"
                  label="Large Input"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">States</h3>
              <div className="flex flex-wrap gap-8 items-start">
                <SingleSelectDropDown
                  state="default"
                  label="Default"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                />
                <SingleSelectDropDown
                  state="focus"
                  label="Focus"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                />
                <SingleSelectDropDown
                  state="selected"
                  label="Selected"
                  value="option1"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                />
                <SingleSelectDropDown
                  state="disabled"
                  label="Disabled"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* MultiSelectDropDown Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Multi Select Drop Down</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-8 items-start">
                <MultiSelectDropDown
                  size="sm"
                  label="Small Input"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                />
                <MultiSelectDropDown
                  size="md"
                  label="Medium Input"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                />
                <MultiSelectDropDown
                  size="lg"
                  label="Large Input"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">States</h3>
              <div className="flex flex-wrap gap-8 items-start">
                <MultiSelectDropDown
                  state="default"
                  label="Default"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                />
                <MultiSelectDropDown
                  state="readonly"
                  label="Read Only"
                  value={['option1']}
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                />
                <MultiSelectDropDown
                  state="disabled"
                  label="Disabled"
                  placeholder="Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>Evaa Design System Component Showcase</p>
        </footer>
        {/* TextArea Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">TextArea</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Default & States</h3>
              <div className="space-y-6">
                <TextArea 
                  label="Default TextArea" 
                  placeholder="Enter your text here" 
                  helperText="This is a helper text"
                />
                <TextArea 
                  label="With Character Count" 
                  placeholder="Type something..." 
                  showCount 
                  maxLength={140}
                  defaultValue="Lorem ipsum dolor sit amet."
                />
                <TextArea 
                  label="Required TextArea" 
                  placeholder="This field is required" 
                  required
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Validation & ReadOnly</h3>
              <div className="space-y-6">
                <TextArea 
                  label="Error State" 
                  placeholder="Invalid input" 
                  error
                  errorMessage="This is an error message"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <TextArea 
                  label="Disabled State" 
                  placeholder="Cannot type here" 
                  disabled 
                  defaultValue="This textarea is disabled"
                />
                <TextArea 
                  label="ReadOnly State" 
                  placeholder="Read only content" 
                  readOnly 
                  defaultValue="This textarea is read-only"
                />
              </div>
            </div>
          </div>
        </section>

        {/* NavigationDropDown Section */}
        <section className="bg-background p-6 rounded-[13px] border border-border">
          <h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-2">Navigation Drop Down</h2>
          <div className="flex flex-wrap gap-12">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Default State</h3>
              <NavigationDropDown 
                label="Setup" 
                items={[
                  { label: "Option 1", onClick: () => alert('Option 1 clicked') },
                  { label: "Option 2", onClick: () => alert('Option 2 clicked') },
                  { label: "Option 3", onClick: () => alert('Option 3 clicked') },
                ]}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Hover Variant</h3>
              <NavigationDropDown 
                label="Setup" 
                variant="hover"
                items={[
                  { label: "Hover Item 1" },
                  { label: "Hover Item 2" },
                ]}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">With Icons</h3>
              <NavigationDropDown 
                label="Settings" 
                items={[
                  { label: "Profile", icon: <span style={{fontSize: '12px'}}>👤</span> },
                  { label: "Account", icon: <span style={{fontSize: '12px'}}>💳</span> },
                  { label: "Security", icon: <span style={{fontSize: '12px'}}>🔒</span> },
                ]}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Disabled State</h3>
              <NavigationDropDown 
                label="Disabled" 
                variant="disabled"
                items={[]}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Icon Only</h3>
              <NavigationDropDown 
                hasLabel={false}
                icon={<span style={{fontSize: '14px'}}>⚙️</span>}
                items={[
                  { label: "Preference 1" },
                  { label: "Preference 2" },
                ]}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">No Caret</h3>
              <NavigationDropDown 
                label="No Caret" 
                hasDropdownIcon={false}
                items={[
                  { label: "Action 1" },
                  { label: "Action 2" },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  );
}

export default App;
