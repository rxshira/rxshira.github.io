import { ReactNode } from 'react';

interface BlobFrameProps {
  children: ReactNode;
  className?: string;
}

const BlobFrame = ({ children, className = '' }: BlobFrameProps) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        className="relative overflow-hidden"
        style={{
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BlobFrame;
