import React, { useRef, useState } from 'react';

import { Box, Button } from '@strapi/design-system';
import { FilterListURLQuery, FilterPopoverURLQuery, useTracking } from '@strapi/helper-plugin';
import { Filter as FilterIcon } from '@strapi/icons';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

export const Filter = ({ displayedFilters }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { formatMessage } = useIntl();
  const buttonRef = useRef();
  const { trackUsage } = useTracking();

  const handleToggle = () => {
    if (!isVisible) {
      trackUsage('willFilterEntries');
    }
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <Box paddingTop={1} paddingBottom={1}>
        <Button
          variant="tertiary"
          ref={buttonRef}
          startIcon={<FilterIcon />}
          onClick={handleToggle}
          size="S"
        >
          {formatMessage({ id: 'app.utils.filters', defaultMessage: 'Filters' })}
        </Button>
        {isVisible && (
          <FilterPopoverURLQuery
            displayedFilters={displayedFilters}
            isVisible={isVisible}
            onToggle={handleToggle}
            source={buttonRef}
          />
        )}
      </Box>
      <FilterListURLQuery filtersSchema={displayedFilters} />
    </>
  );
};

Filter.propTypes = {
  displayedFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      metadatas: PropTypes.shape({ label: PropTypes.string }),
      fieldSchema: PropTypes.shape({ type: PropTypes.string }),
    })
  ).isRequired,
};
