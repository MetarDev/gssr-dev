import { StyleFunctionProps } from '@chakra-ui/react';

const styles = {
	global: (props: StyleFunctionProps) => ({
		header: {
			bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.200',
		},
		footer: {
			bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.200',
		}
	})
}

export default styles;
