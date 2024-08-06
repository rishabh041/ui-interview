import React from 'react';

import { useTheme } from './ThemeContext';

const App = () => {
  const { theme } = useTheme();

  return (
    <div>
      {theme}
    </div>
  );
};

export default App;