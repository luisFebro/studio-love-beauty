// reference: https://material-ui.com/components/autocomplete/
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import axios from 'axios';
import { configTypeJson } from '../../utils/server/configTypeJson';

AsyncAutoCompleteSearch.propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    circularProgressColor: PropTypes.oneOf(["inherit", "primary", "secondary"])
}

function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

export default function AsyncAutoCompleteSearch({
    url, circularProgressColor, onSearchChange }) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if(!loading) {
            return undefined;
        }

        (async () => {
            const response = await axios.get(url, configTypeJson);
            await sleep(1e3); // For demo purposes.

            if(active) {
                setOptions(response.data);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if(!open) {
            setOptions([]);
        }
    }, [open]);

    const styles = {
        asyncAutoSearch: {
            backgroundColor: 'var(--mainWhite)',
            color: 'black',
            fontSize: '1.4em'
        },
        icon: {
            color: "var(--mainPink)",
            transform: 'scale(1.4)'
        },
        loadingIcon: {
            color: "var(--mainPink)",
        }
    }

    return (
        <Autocomplete
          id="asynchronous-demo"
          style={{ width: 400 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          getOptionSelected={(option, value) => option === value}
          getOptionLabel={option => option}
          options={options}
          loading={loading}
          loadingText="Carregando..."
          clearText="Limpar"
          closeText="Fechar"
          noOptionsText="Nada encontrado, admin."
          autoHighlight
          blurOnSelect
          clearOnEscape
          autoComplete
          renderInput={params => (
            <TextField
              {...params}
              style={styles.asyncAutoSearch}
              placeholder="Procure pelo nome do cliente"
              onBlur={onSearchChange}
              fullWidth
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon style={styles.icon} />
                </InputAdornment>
            ),
            endAdornment: (
                <React.Fragment>
                    {loading ? <CircularProgress color={circularProgressColor || "inherit"} size={25} /> : null}
                    {params.InputProps.endAdornment}
                </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}