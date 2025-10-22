import React from 'react';
import { NotionRenderer, UnsupportedBlockError } from './src/index';

// Mock block map with unsupported block types
const mockBlockMapWithUnsupportedBlocks = {
  "test-1": {
    role: "reader",
    value: {
      id: "test-1",
      version: 1,
      type: "collection_view", // Unsupported database block
      parent_id: "root",
      parent_table: "block",
      alive: true,
      created_time: Date.now(),
      last_edited_time: Date.now(),
      created_by_table: "notion_user",
      created_by_id: "user-1",
      last_edited_by_table: "notion_user", 
      last_edited_by_id: "user-1",
      properties: {
        title: [["Database Block"]]
      }
    }
  },
  "test-2": {
    role: "reader", 
    value: {
      id: "test-2",
      version: 1,
      type: "checkbox", // Unsupported checkbox block
      parent_id: "root",
      parent_table: "block",
      alive: true,
      created_time: Date.now(),
      last_edited_time: Date.now(),
      created_by_table: "notion_user",
      created_by_id: "user-1", 
      last_edited_by_table: "notion_user",
      last_edited_by_id: "user-1",
      properties: {
        title: [["Checkbox Item"]]
      }
    }
  },
  "test-3": {
    role: "reader",
    value: {
      id: "test-3", 
      version: 1,
      type: "table_of_contents", // Unsupported TOC block
      parent_id: "root",
      parent_table: "block",
      alive: true,
      created_time: Date.now(),
      last_edited_time: Date.now(),
      created_by_table: "notion_user",
      created_by_id: "user-1",
      last_edited_by_table: "notion_user",
      last_edited_by_id: "user-1"
    }
  }
};

// Test component demonstrating error handling
export const ErrorHandlingDemo = () => {
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);

  const handleUnsupportedBlock = (blockType: string, blockId?: string) => {
    const message = `Unsupported block detected: ${blockType} (ID: ${blockId})`;
    setErrorMessages(prev => [...prev, message]);
    console.warn(message);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React Notion Error Handling Demo</h1>
      <p>This demo shows how the library now handles unsupported block types:</p>
      
      <h2>Error Handling Enabled (Default)</h2>
      <div style={{ border: '1px solid #ddd', padding: '16px', marginBottom: '20px' }}>
        <NotionRenderer
          blockMap={mockBlockMapWithUnsupportedBlocks}
          showUnsupportedBlockErrors={true}
          onUnsupportedBlock={handleUnsupportedBlock}
        />
      </div>

      <h2>Error Handling Disabled (Backward Compatibility)</h2>
      <div style={{ border: '1px solid #ddd', padding: '16px', marginBottom: '20px' }}>
        <NotionRenderer
          blockMap={mockBlockMapWithUnsupportedBlocks}
          showUnsupportedBlockErrors={false}
        />
      </div>

      <h2>Standalone Error Component Examples</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <UnsupportedBlockError blockType="collection_view" blockId="db-123" />
        <UnsupportedBlockError blockType="checkbox" />
        <UnsupportedBlockError blockType="table_of_contents" />
        <UnsupportedBlockError blockType="unknown_block_type" blockId="xyz-789" />
      </div>

      {errorMessages.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Error Callback Messages:</h3>
          <ul>
            {errorMessages.map((msg, idx) => (
              <li key={idx} style={{ color: '#d9534f' }}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ErrorHandlingDemo;