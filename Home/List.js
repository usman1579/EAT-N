import React from 'react';
import { StyleSheet,ScrollView ,Text, View,Image, TouchableOpacity,FlatList ,ActivityIndicator,Dimensions } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';

export default class List extends React.Component {

   constructor(props){
    super(props);
    this.state = {

      loading: true,

      dataSource : [],
    
      fetching_from_server: false,
    };
    this.num_pages = 1;
  
  }
  
  
  
  componentDidMount(){
   console.log("HI");
    const url=('https://dev.eatnnow.com/restaurant/?num_pages=' + this.num_pages);
    fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {

            this.num_pages = this.num_pages + 1;

              this.setState({
                  dataSource: [...this.state.dataSource , ...responseJson.results],
              
                  loading:false,
                },
               console.log('data :', responseJson.results) )
  
               
          })
          .catch((error) => {
              console.log(error);
          })
  
  }


  loadMoreData = () => {
    //On click of Load More button We will call the web API again
      this.setState({ fetching_from_server: true }, () => {
        fetch('https://dev.eatnnow.com/restaurant/?num_pages=' + this.num_pages)
        //Sending the currect offset with get request
            .then(response => response.json())
            .then(responseJson => {
            //Successful response from the API Call 
            this.num_pages = this.num_pages + 1;
              //After the response increasing the offset for the next API call.
              this.setState({
                dataSource: [...this.state.dataSource, ...responseJson.results],
                //adding the new data with old one available
                fetching_from_server: false,
                //updating the loading state to false
              });
            })
            .catch(error => {
              console.error(error);
            });
      });
    };

 
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    const { rating } = this.props;
    return (
      <TouchableOpacity style={styles.item}>
     
     

        <Image
            style={{width: 120  ,height: 120}}
            source={{uri: item.logo}}
          />
        
         
          <View style={{width:'70%',backgroundColor:'white',}}>

          {item.is_open === false ?  <View style={styles.closed}>
                  <Text style={{color:"white",fontSize:11,fontWeight:'500',textAlign:'center',justifyContent:'center'}}>
                      Closed
                  </Text>
              </View>  : <View style={styles.closed1}>
                  <Text style={{color:"white",fontSize:11,fontWeight:'400',textAlign:'center',justifyContent:'center'}}>
                      open
                  </Text>
              </View> }
              

           <Text style={{fontSize:14,fontWeight:'500',margin:10,color:'grey' }}>
               {item.name}
              </Text>

              <Rating
              imageSize={14}
              readonly
              startingValue={rating}
              style={styles.rating}
              />

              <Text style={{color:'lightgrey',fontSize:11,fontWeight:'200',margin:10,marginTop:-8}}>
                  Lorem ipsum dolar set amet,consectetur adipiscing elit
              </Text>
              
              </View>

              </TouchableOpacity>
    );
  };



    
  renderFooter() {
  
    return (
    //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }



  
  render() {
    return (
      <View style={styles.container}>
      
      <FlatList
        data={this.state.dataSource}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}

        onEndReached={this.loadMoreData}
        ListFooterComponent={this.renderFooter.bind(this)}
         />
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection:'row',
    flex:1,
    overflow: 'hidden',
    borderRadius:15,
    margin:10,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: 'black',
  },
  closed:{
      alignItems:'center',
      justifyContent:'center',
      marginLeft:150,
      borderRadius:4,
      marginTop:-2,
      height:20,
      width:40,
      backgroundColor:'red'
  },
  closed1:{
    //alignItems:'center',
    marginLeft:150,
    borderRadius:5,
    height:20,
    width:40,
    backgroundColor:'white'
},
  rating:{
    alignItems:'flex-start',
    marginTop:-6,
    margin:10
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
});
