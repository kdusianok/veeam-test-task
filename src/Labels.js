import { useCallback } from "react";

const Labels = ({ labels, setLabels }) => {
  const onClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const editLabel = useCallback(
    (labelKey, value) => {
      setLabels((labels) =>
        labels.map((label, key) => {
          if (key === labelKey) {
            return {
              ...label,
              editable: false,
              text: value
            };
          }
          return label;
        })
      );
    },
    [setLabels]
  );

  const onBlur = useCallback(
    (labelKey) => (e) => {
      editLabel(labelKey, e.target.value);
    },
    [editLabel]
  );

  const onKeyDown = useCallback(
    (labelKey) => (e) => {
      if (e.key === "Enter") {
        editLabel(labelKey, e.target.value);
      }
    },
    [editLabel]
  );

  return (
    <>
      {labels.map((label, key) => (
        <div
          key={key}
          className="label"
          onClick={onClick}
          style={{
            top: label.top,
            left: label.left
          }}
        >
          {label.editable ? (
            <input autoFocus onKeyDown={onKeyDown(key)} onBlur={onBlur(key)} />
          ) : (
            label.text
          )}
        </div>
      ))}
    </>
  );
};

export default Labels;
