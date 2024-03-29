import { useState } from 'react';
import { Box } from '@mui/material';

import { HEADERS_EDITOR, VARIABLES_EDITOR } from '../../../constants';
import { useTranslation } from '../../../hooks';
import type { Editor } from '../../../types';
import ControlButton from '../../shared/ControlButton/ControlButton';
import EditorTextarea from '../EditorTextarea/EditorTextarea';

import styles from './CustomAccordion.module.css';

const CustomAccordion = () => {
  const translation = useTranslation();
  const [selectedDiv, setSelectedDiv] = useState<Editor>(VARIABLES_EDITOR);
  const [visibleDiv, setVisibleDiv] = useState(false);

  const showDiv = (divName: Editor) => {
    setVisibleDiv(true);
    setSelectedDiv(divName);
  };

  const toggleDiv = () => {
    setVisibleDiv(!visibleDiv);
  };

  return (
    <Box className={styles.wrapperAccordion} sx={{ bgcolor: 'primary.contrastText' }}>
      <div className={styles.wrapperGroup}>
        <div>
          <ControlButton
            label={translation.variables}
            isActive={selectedDiv === VARIABLES_EDITOR}
            onClick={() => showDiv(VARIABLES_EDITOR)}
          />
          <ControlButton
            label={translation.headers}
            isActive={selectedDiv === HEADERS_EDITOR}
            onClick={() => showDiv(HEADERS_EDITOR)}
          />
          <button
            data-testid={'toggle-button'}
            className={`${styles.buttonGroup} ${visibleDiv ? styles.visible : ''}`}
            onClick={toggleDiv}
          ></button>
        </div>
      </div>
      {visibleDiv && <EditorTextarea selectedDiv={selectedDiv} />}
    </Box>
  );
};

export default CustomAccordion;
