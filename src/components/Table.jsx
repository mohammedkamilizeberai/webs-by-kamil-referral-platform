// Generic responsive table. On narrow screens (see index.css) each row
// becomes a stacked card, using the data-label attribute on each cell so
// the column name is still visible without horizontal scrolling.

export default function Table({ columns, rows, getRowKey, onRowClick }) {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="table-wrap" role="table">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const key = getRowKey ? getRowKey(row) : row.id;
            return (
              <tr
                key={key}
                className={onRowClick ? "clickable-row" : ""}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={
                  onRowClick
                    ? (e) => {
                        if (e.key === "Enter") onRowClick(row);
                      }
                    : undefined
                }
              >
                {columns.map((col) => (
                  <td key={col.key} data-label={col.label}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
