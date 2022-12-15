import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Animated, Dimensions, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import colors from '../config/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');

function MoneyScreen(props) {
  const [activePage, setactivePage] = useState(0)
  const [pin, setPin] = useState(false)

  const cards = [
    {
      "type": "Visa",
      "card_number": "1212 3434 6767 8989",
      "card_holder": "Pratik Deshmukh",
      "validity": "10/20",
      "pin": "2004",
      "cvv": "223"
    },
    {
      "type": "Master",
      "card_number": "1212 3434 6767 8989",
      "card_holder": "Satish Mungusmare",
      "validity": "10/30",
      "pin": "0987",
      "cvv": "890"
    },
    {
      "type": "Rupay",
      "card_number": "1212 3434 6768 8989",
      "card_holder": "Bhupendra Deshmukh",
      "validity": "11/30",
      "pin": "2580",
      "cvv": "789"
    },
  ]
  const banks = [
    {
      "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/240px-SBI-logo.svg.png",
      "name": "State Bank Of India",
      "number": "922110510001412",
      "balance": 2001
    },
    {
      "logo": "https://play-lh.googleusercontent.com/Rvr_Z24TXfc1iBkcX-3ENupW7ZI92-3WoumuTRgvb1x2jYjBLhq-5YArjgXoTNWtFJ0",
      "name": "Bank Of India",
      "number": "922110510001412",
      "balance": 292
    },
    {
      "logo": "http://www.logotaglines.com/wp-content/uploads/2016/08/Paytm-Logo.jpg",
      "name": "Paytm Payment Banks",
      "number": "922110510001412",
      "balance": 109
    },
    {
      "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/240px-SBI-logo.svg.png",
      "name": "State Bank Of India",
      "number": "922110510001412",
      "balance": 2001
    }
  ]

  const transactions = [
    {
      "name": "Satish Mungusmare",
      "amount": "2,12",
      "date": "12:20 PM, Wednesday 12"
    },
    {
      "name": "Bhupendra Deshmukh",
      "amount": "1,12",
      "date": "01:20 PM, Tuesday 13"
    },
    {
      "name": "Anand Patel",
      "amount": "3,12",
      "date": "3:20 PM, Thursday 15"
    },
    {
      "name": "Satish Mungusmare",
      "amount": "2,12",
      "date": "12:20 PM, Wednesday 12"
    },
    {
      "name": "Bhupendra Deshmukh",
      "amount": "1,12",
      "date": "01:20 PM, Tuesday 13"
    },
    {
      "name": "Anand Patel",
      "amount": "3,12",
      "date": "3:20 PM, Thursday 15"
    }
  ]

  return (
    <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
      <Header icon={"account-off"} title="Money" color={colors.sky} />
      <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled onMomentumScrollEnd={(event) => setactivePage(event.nativeEvent.contentOffset.x / 360)} horizontal >
        {cards.map((item, index) => (
          <TouchableOpacity key={index}>
          <LinearGradient
            // Background Linear Gradient
            colors={[colors.danger, colors.sky, colors.yellow].sort(() => Math.random() - 0.5)}
            style={[styles.card]}
            start={[0, 1]}
            end={[1, 0]}
          >
            <View style={{ flexDirection: 'row' }}>

              {
                pin ?
                  <Text style={{ marginTop: 20, marginLeft: 22, fontSize: 20, color: colors.white, fontWeight: 'bold' }}>{item.pin}</Text> :
                  <Text style={{ marginTop: 20, color: colors.white, marginLeft: 20, fontSize: 15 }}>State Bank Of India</Text>

              }
              <Text style={{ color: colors.white, marginLeft: 'auto', marginRight: 20, marginTop: 10, fontSize: 27, fontWeight: "bold" }}>{item.type}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <MaterialCommunityIcons onPress={() => setPin(!pin)} style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }} name='integrated-circuit-chip' color={colors.yellow} size={50} />
              <Text style={{ marginLeft: 20, color: colors.white, fontSize: 20, fontWeight: '400', marginTop: 25 }}>{item.card_number}</Text>
            </View>
            <View style={{ width: '100%', padding: 17, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 10, color: "#303030", fontWeight: '800', textTransform: 'uppercase' }}>CARD HOLDER</Text>
                <Text style={{ fontSize: 17, color: "#e5e5e5", fontWeight: '800', textTransform: 'capitalize' }}>{item.card_holder}</Text>
              </View>
              <View style={{ marginLeft: 'auto' }}>
                <Text style={{ color: '#303030', fontWeight: '800', fontSize: 10, textTransform: 'uppercase' }}>Expires</Text>
                <Text style={{ color: '#e5e5e5', fontSize: 20, fontWeight: '500' }}>{item.validity}</Text>
              </View>
              {
                pin ?
                  <View style={{ marginLeft: 'auto' }}>
                    <Text style={{ color: '#303030', fontWeight: '800', fontSize: 10, textTransform: 'uppercase' }}>CVV</Text>
                    <Text style={{ color: '#e5e5e5', fontSize: 17, fontWeight: '500' }}>{item.cvv}</Text>
                  </View>
                  :
                  ""
              }
            </View>
          </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5, marginTop: 5 }}>
        {cards.map((item, index) => (
          <View key={index} style={{ height: 5, marginHorizontal: 3, backgroundColor: activePage != index ? "#404040" : [colors.danger, colors.sky, colors.yellow].sort(() => Math.random() - 0.5)[0], width: 30, borderRadius: 10 }}></View>
        ))}
      </View>

      {/* Bank Accounts */}
      <View style={{ margin: 10, borderRadius: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ color: '#e5e5e5', fontSize: 17, fontWeight: '500' }}>Bank Accounts</Text>
          {pin && <Text style={{ color: colors.sky, fontSize: 15, fontWeight: '500' }}>₹ {"10, 202"}</Text>}
        </View>
        {banks.map((bank, index) => (
          <TouchableOpacity key={index} style={{ marginVertical: 3, flexDirection: "row", backgroundColor: "#202020", padding: 15, borderRadius: 10 }}>
            <View style={{ backgroundColor: colors.white, padding: 5, borderRadius: 50, width: 35, height: 35, alignItems: 'center' }}>
              <Image style={{ width: 20, height: 20, marginTop: 3 }} source={{ uri: bank.logo }} />
            </View>
            <View>
              <Text style={{ color: '#e5e5e5', fontSize: 15, fontWeight: '500', marginLeft: 15 }}>{bank.name}</Text>
              <Text style={{ color: '#909090', fontSize: 15, fontWeight: '500', marginLeft: 15 }}>{bank.number}</Text>
            </View>
            {pin && <Text style={{ marginLeft: 'auto', color: colors.sky, fontSize: 15, fontWeight: '500', marginTop: 10 }}>₹ {bank.balance}</Text>}
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20, marginHorizontal: 15 }}>
        <MaterialCommunityIcons onPress={() => setPin(!pin)} style={{ marginHorizontal: 'auto' }} name='chevron-left' color={colors.white} size={25} />
        <Text style={{ color: colors.sky, fontSize: 17, fontWeight: '500', marginHorizontal: 'auto' }}>November</Text>
        <MaterialCommunityIcons onPress={() => setPin(!pin)} style={{ marginHorizontal: 'auto' }} name='chevron-right' color={colors.white} size={25} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: "space-around", padding: 10 }}>
        <TouchableOpacity style={{ paddingHorizontal: 30, paddingVertical: 12, borderColor: colors.white, borderWidth: 0.4, borderRadius: 10, backgroundColor: colors.sky }}>
          <Text style={{ color: "#303030", fontSize: 13, fontWeight: '500', marginHorizontal: 'auto' }}>Money In</Text>
          <Text style={{ color: colors.white, fontSize: 17, fontWeight: '500', marginHorizontal: 'auto' }}>₹ 10, 200</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 30, paddingVertical: 12, borderColor: colors.danger, borderWidth: 0.4, borderRadius: 10 }}>
          <Text style={{ color: "#909090", fontSize: 13, fontWeight: '500', marginHorizontal: 'auto' }}>Money Out</Text>
          <Text style={{ color: colors.white, fontSize: 17, fontWeight: '500', marginHorizontal: 'auto' }}>₹ 7, 020</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10}}>
        {transactions.map((transaction, index) => (
          <TouchableOpacity key={index} style={{ marginVertical: 0.5, flexDirection: "row", backgroundColor: "#202020", padding: 15, borderRadius: 5 }}>
            <View>
              <Text style={{ color: '#e5e5e5', fontSize: 15, fontWeight: '500', marginLeft: 15 }}>{transaction.name}</Text>
              <Text style={{ color: '#909090', fontSize: 10, fontWeight: '500', marginLeft: 15 }}>{transaction.date}</Text>
            </View>
            <Text style={{ marginLeft: 'auto', color: colors.sky, fontSize: 15, fontWeight: '500', marginTop: 7 }}>₹ {transaction.amount}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    shadowOffset: {
      width: 0,
      height: 3
    },
    backgroundColor: '#101010',
  },
  card: {
    width: width - 20,
    height: 200,
    marginLeft: 10,
    borderRadius: 20,
    opacity: 0.8,
    margin: 10
  }
});

export default MoneyScreen