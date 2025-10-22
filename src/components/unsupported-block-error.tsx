import * as React from "react";

interface UnsupportedBlockErrorProps {
  blockType: string;
  blockId?: string;
  className?: string;
}

const getErrorMessage = (
  blockType: string
): { title: string; message: string; suggestion: string } => {
  switch (blockType) {
    case "collection_view":
    case "collection_view_page":
    case "database":
      return {
        title: "Database Not Supported",
        message:
          "This Notion document includes a Database which cannot be imported.",
        suggestion:
          "Please remove the Database to render this page, or consider using react-notion-x for full database support."
      };

    case "checkbox":
    case "to_do_list":
      return {
        title: "Checkbox Not Supported",
        message:
          "This Notion document includes Checkboxes which cannot be imported.",
        suggestion:
          "Please remove the Checkboxes to render this page, or consider using react-notion-x for checkbox support."
      };

    case "table_of_contents":
    case "toc":
      return {
        title: "Table of Contents Not Supported",
        message:
          "This Notion document includes a Table of Contents which cannot be imported.",
        suggestion:
          "Please remove the Table of Contents to render this page, or consider using react-notion-x for full support."
      };

    case "synced_block":
      return {
        title: "Synced Block Not Supported",
        message:
          "This Notion document includes a Synced Block which cannot be imported.",
        suggestion:
          "Please remove the Synced Block to render this page, or consider using react-notion-x for full support."
      };

    case "equation":
      return {
        title: "Equation Block Not Supported",
        message:
          "This Notion document includes an Equation which cannot be imported.",
        suggestion:
          "Please remove the Equation to render this page, or consider using react-notion-x for equation support."
      };

    default:
      return {
        title: "Unsupported Block Type",
        message: `This Notion document includes a '${blockType}' block which cannot be imported.`,
        suggestion:
          "Please remove this block to render this page, or consider using react-notion-x for extended block support."
      };
  }
};

export const UnsupportedBlockError: React.FC<UnsupportedBlockErrorProps> = ({
  blockType,
  blockId,
  className
}) => {
  const { title, message, suggestion } = getErrorMessage(blockType);

  return (
    <div className={`notion-unsupported-block ${className || ""}`}>
      <div className="notion-unsupported-block-content">
        <div className="notion-unsupported-block-icon">
          <span role="img" aria-label="Warning">
            ⚠️
          </span>
        </div>
        <div className="notion-unsupported-block-text">
          <div className="notion-unsupported-block-title">{title}</div>
          <div className="notion-unsupported-block-message">{message}</div>
          <div className="notion-unsupported-block-suggestion">
            {suggestion}
          </div>
          {blockId && (
            <div className="notion-unsupported-block-id">
              Block ID: {blockId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnsupportedBlockError;
