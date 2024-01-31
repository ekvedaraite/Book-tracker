const TextInput = ({ label, name, value, onChange, type = 'text' }) => {
  return (
    // Label for the input with a dynamically provided label text
    <label>
      {label}
      {/* Input element with provided name, value, onChange, and type */}
      <input type={type} name={name} value={value} onChange={onChange} />
    </label>
  )
}

export default TextInput
