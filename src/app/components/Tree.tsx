import React, { useState } from 'react';
import { TableCell, TableRow } from '~/islands/primitives/table';

const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: 20 }}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {hasChildren && (isOpen ? '[-]' : '[+]')} {node.name}
      </div>
      {hasChildren && isOpen && (
        <div>
          {node.children.map(childNode => {
            return (<div>
            <TreeNode key={childNode.id} node={childNode} />
            <TableRow key={childNode.id}>
                {/* <TableCell>{childNode.name}</TableCell> */}
                <TableCell>{childNode.orderNo}</TableCell>
                <TableCell>{childNode.updated_at.toISOString()}</TableCell>
                <TableCell>编辑、删除</TableCell>
            </TableRow>
            </div>
          )
        }
        )}
         
        </div>
      )}
    </div>
  );
};

const Tree = ({ data }) => {
  return (
    <div>
      {data.map(node => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default Tree;