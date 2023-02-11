

import {Group, Input, FormInputLabel } from './form-input.styles'

const FormInput = ({ label, ...inputAttributes }) => {

    return (
        <Group>
            <Input {...inputAttributes}/>
            {label && (
                <FormInputLabel shrink={!!inputAttributes.value.length}>{label}</FormInputLabel>
            )}
            
        </Group>
    );

}

export default FormInput;