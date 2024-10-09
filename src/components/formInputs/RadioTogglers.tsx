interface Option {
  name: string;
  icon: JSX.Element;
  label: string;
}

interface RadioTogglersProps {
  options: Option[];
  defaultValue: string;
}

export default function RadioTogglers({ options, defaultValue }: RadioTogglersProps) {
  return (
    <div className="radio-togglers shadow">
      {options.map(({ name, icon, label }) => (
        <label key={name}>
          <input defaultChecked={defaultValue === name} type="radio" name="bgType" value={name} />
          <span>
            {icon}
            {label}
          </span>
        </label>
      ))}
    </div>
  );
}
