// reference: https://material-ui.com/components/autocomplete/
import React, { useState } from 'react';
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
    url,
    circularProgressColor,
    onAutoSelectChange,
    backgroundColor,
    needUserValueFunc = false,
    freeSolo = false,
    disableOpenOnFocus = false,
    placeholder }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [autoCompleteUrl, setAutoCompleteUrl] = useState(url);
    const loading = open && options.length === 0;

    const onUserValueChange = e => {
        const changedValue = e.target.value;
        setAutoCompleteUrl(`/api/finance/cash-ops/list/all?search=${changedValue}&autocomplete=true`)
    }

    React.useEffect(() => {
        let active = true;

        if(!loading) {
            return undefined;
        }

        (async () => {
            const response = await axios.get(autoCompleteUrl, configTypeJson);
            console.log("response", response);
            await sleep(1e3); // For demo purposes.

            if(active) {
                setOptions(response.data);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, autoCompleteUrl]);

    React.useEffect(() => {
        if(!open) {
            setOptions([]);
        }
    }, [open]);

    const styles = {
        asyncAutoSearch: {
            backgroundColor: backgroundColor || 'var(--mainWhite)',
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
          onChange={(event, value) => onAutoSelectChange(value)}
          getOptionSelected={(option, value) => option === value}
          getOptionLabel={option => option}
          options={options}
          loading={loading}
          loadingText="Carregando..."
          clearText="Limpar"
          closeText="Fechar"
          noOptionsText="Nada encontrado, admin."
          autoHighlight
          includeInputInList
          disableOpenOnFocus={disableOpenOnFocus}
          freeSolo={freeSolo}
          clearOnEscape
          autoComplete
          renderOption={option => (
              <div className="text-em-1-4">
                <span><i style={{color: 'grey'}} className="fas fa-search"></i></span>{" "}
                {option}
              </div>
          )}
          renderInput={params => (
            <TextField
              {...params}
              style={styles.asyncAutoSearch}
              placeholder={placeholder}
              fullWidth
              onChange={onUserValueChange}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                style: {
                    fontSize: '1em',
                },
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