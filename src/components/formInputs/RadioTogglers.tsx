interface Option {
  name: string;
  icon: JSX.Element;
  label: string;
}

interface RadioTogglersProps {
  options: Option[];
}

export default function RadioTogglers({ options }: RadioTogglersProps) {
  return (
    <div className="radio-togglers shadow">
      {options.map(({ name, icon, label }) => (
        <label key={name}>
          <input
            type="radio"
            name="bgType"
            value={name} 
          />
          <span>
            {icon}
            {label}
          </span>
        </label>
      ))}
    </div>
  );
}
