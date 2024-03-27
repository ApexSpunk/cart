import { Box, Button, ButtonGroup, Flex, Grid, GridItem, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";


function App() {
  const [productList, setProductList] = useState([]);

  const [discount, setDiscount] = useState({ percentage: 0, display: false });

  const handleQuantity = (id, type) => {
    const updatedProductList = productList.map((product) => {
      if (product.id === id) {
        if (type === "increment") {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return { ...product, quantity: product.quantity - 1 };
        }
      }
      return product;
    });
    setProductList(updatedProductList);
    localStorage.setItem('productList', JSON.stringify(updatedProductList));
  }

  useEffect(() => {
    const productList = JSON.parse(localStorage.getItem('productList'));
    if (productList) {
      setProductList(productList);
    }else{
      setProductList([
        { id: 1, name: "Product A", price: 53.40, quantity: 1 },
        { id: 2, name: "Product B", price: 100, quantity: 1 },
        { id: 3, name: "Product C", price: 150, quantity: 1 },
        { id: 4, name: "Product D", price: 200, quantity: 1 },
        { id: 5, name: "Product E", price: 250, quantity: 1 }
      ]);
    }
  }, []);


  return (
    <Grid gap={6} mx={{ base: 4, md: 8, lg: 16 }} my={8} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}>
      <GridItem colSpan={{ base: 1, md: 1, lg: 3 }} p={4} rounded="md" shadow="md">
        <Text fontSize="xl" fontWeight="bold" mb='6'>Cart</Text>
        {
          productList.map((product) => {
            return (
              <Flex justify='space-between' key={product.id} p={4} mb={4} bg="gray.100" rounded="md" shadow="md" direction={{ base: 'column', md: 'row' }}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold">{product.name}</Text>
                  <Text fontSize="md">Price: ₹{new Intl.NumberFormat('en-IN').format(product.price)}</Text>
                  <Text fontSize="md">Total: ₹{new Intl.NumberFormat('en-IN').format(product.price * product.quantity)}</Text>
                </Box>
                <Flex direction='column' justify='space-between'>
                  <ButtonGroup>
                    <Button colorScheme="blue" onClick={() => handleQuantity(product.id, "decrement")}>-</Button>
                    <Input value={product.quantity} />
                    <Button colorScheme="blue" onClick={() => handleQuantity(product.id, "increment")}>+</Button>
                  </ButtonGroup>
                  <Button colorScheme="red" mt={4} size='xs' onClick={() => setProductList(productList.filter((p) => p.id !== product.id))}>
                    Remove
                  </Button>
                </Flex>
              </Flex>
            );
          })
        }
      </GridItem>
      <GridItem bg="gray.100" p={4} rounded="md" shadow="md" colSpan={{ base: 1, md: 1, lg: 1 }}>
        <Text fontSize="xl" fontWeight="bold" mb='6'>Total</Text>
        <Text fontSize="lg">Total Items: {productList.length}</Text>
        {discount.display && <Text fontSize="lg">Discount: {discount.percentage}%</Text>}
        <Text fontSize="lg" textDecorationLine={discount.display && 'line-through'}>Total Price: ₹{new Intl.NumberFormat('en-IN').format(productList.reduce((acc, product) => acc + (product.price * product.quantity), 0))}</Text>
        {discount.display && <Text fontSize="lg">Discounted Price: ₹{new Intl.NumberFormat('en-IN').format(productList.reduce((acc, product) => acc + (product.price * product.quantity), 0) - (productList.reduce((acc, product) => acc + (product.price * product.quantity), 0) * discount.percentage / 100))}</Text>}
        <NumberInput min={0} max={100} onChange={(value) => setDiscount({ display: false, percentage: value })} placeContent={'center'}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button colorScheme="blue" mt={4} onClick={() => setDiscount({ ...discount, display: true })}>
          Apply Coupon
        </Button>
      </GridItem>
    </Grid>
  );
}

export default App;
