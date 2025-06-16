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
  const baseClasses = 'rounded-lg overflow-hidden w-full transition-all duration-300 ease-in-out hover:shadow-md';
  
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
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-5 transition-colors duration-300 ease-in-out">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300 ease-in-out">{title}</h3>
        </div>
      )}
      <div className="w-full h-full transition-colors duration-300 ease-in-out">
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