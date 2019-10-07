import React from 'react';

import { Text } from 'react-native';

const Product = (navigation) => (
    <Text>TESTE DO TESTE</Text>
);

    Product.navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.product.title
    });

export default Product;