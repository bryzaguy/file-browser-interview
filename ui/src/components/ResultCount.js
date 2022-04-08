import { TextField } from "@mui/material";

export default function ResultCount({ value, onChange }) {
  return (
    <TextField
      label="# of results"
      placeholder="10"
      type="number"
      size="small"
      value={value || ' '}
      onChange={e => {
        // Coerce into a number
        const nextValue = +e.target.value
        onChange(nextValue < 1 ? null : nextValue)
      }}
      variant="outlined"
    />
  );
}