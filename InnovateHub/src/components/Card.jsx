import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for displaying content in a boxed layout
 * @param {Object} props - Component props
 * @param {string} props.variant - Card variant (default, outlined, elevated)
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Card component
 */
const Card = ({ 
  variant = 'default', 
  title, 
  children,
  className = '',
  ...rest 
}) => {
  // Base classes
  const baseClasses = 'rounded-lg overflow-hidden';
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 shadow',
    outlined: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg',
  };
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`;
  
  return (
    <div className={cardClasses} {...rest}>
      {title && (
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated']),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;