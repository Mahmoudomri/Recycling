import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text , ScrollView,Dimensions,circleSize,circleThickness } from 'react-native';
import axios from 'axios';
import { ProgressCircle } from 'react-native-progress';
import { BarChart } from 'react-native-chart-kit';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const Ptrois = ({ percentage }) => {
const [data, setData] = useState([]);
const [categories, setCategories] = useState([]);
const [objetCount, setObjetCount] = useState(0);
const [allArticles, setAllArticles] = useState([]);
const [recyclableArticles, setRecyclableArticles] = useState([]);
const [recyclables, setRecyclables] = useState([]);
const [nonRecyclables, setNonRecyclables] = useState([]);
//const [totalArticles, setTotalArticles] = useState(0);
const [recyclableArticless, setRecyclableArticless] = useState(0);
const [nonRecyclableArticles, setNonRecyclableArticles] = useState(0);
const [recyclingPercentage, setRecyclingPercentage] = useState(0);
const [totalArticless, setTotalArticless] = useState(0);
  const [recyclableArticlesss, setRecyclableArticlesss] = useState(0);
  const [nonRecyclableArticless, setNonRecyclableArticless] = useState(0);
  const [recyclingPercentages, setRecyclingPercentages] = useState(0);
  const [mostCollectedMaterials, setMostCollectedMaterials] = useState([]);
  const [recyclablePercentage, setRecyclablePercentage] = useState(0);
  const [nonRecyclablePercentage, setNonRecyclablePercentage] = useState(0);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (circumference * percentage) / 100;
  const [totalCollectPoints, setTotalCollectPoints] = useState(0);
/*
const circleSize = Dimensions.get('window').width * 0.6;
const size = Dimensions.get('window').width * 0.6;
const circleThickness = 20;
*/
//const [totalArticles, setTotalArticles] = useState(0);
const [totalItems, setTotalItems] = useState([]);
  const [recyclableItems, setRecyclableItems] = useState([]);
useEffect(() => {
    fetch('http://10.0.2.2:8000/api/objets')
      .then(response => response.json())
      .then(data => setObjetCount(data.length))
      .catch(error => console.error(error));
      fetchData();
      fetch('http://10.0.2.2:8000/api/objets')
      .then((response) => response.json())
      .then((json) => setAllArticles(json))
      .catch((error) => console.error(error));

    fetch('http://10.0.2.2:8000/api/vendres')
      .then((response) => response.json())
      .then((json) => setRecyclableArticles(json))
      .catch((error) => console.error(error));
      fetch('http://10.0.2.2:8000/api/objets')
      .then(response => response.json())
      .then(data => {
        setTotalArticles(data.length);
      });

    fetch('http://10.0.2.2:8000/api/vendres')
      .then(response => response.json())
      .then(data => {
        setRecyclables(data);
      });
      fetch('http://10.0.2.2:8000/api/objets')
      .then(response => response.json())
      .then(data => setTotalItems(data))
      .catch(error => console.error(error));
      
    fetch('http://10.0.2.2:8000/api/vendres')
      .then(response => response.json())
      .then(data => setRecyclableItems(data))
      .catch(error => console.error(error));

      axios.get('http://10.0.2.2:8000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });


      fetch('http://10.0.2.2:8000/api/objets')
      .then(response => response.json())
      .then(data => setTotalArticless(data.length))
      .catch(error => console.error(error));

    fetch('http://10.0.2.2:8000/api/vendres')
      .then(response => response.json())
      .then(data => {
        const recyclable = data.filter(item => item.type === 'recyclable').length;
        const nonRecyclable = data.filter(item => item.type === 'non-recyclable').length;
        setRecyclableArticlesss(recyclable);
        setNonRecyclableArticless(nonRecyclable);
        setRecyclingPercentages((recyclable / (recyclable + nonRecyclable)) * 100);
      })
      .catch(error => console.error(error));


      fetch('http://10.0.2.2:8000/api/objets')
      .then(response => response.json())
      .then(data => {
        // Count the occurrences of each title in the data
        const counts = {};
        data.forEach(objet => {
          const title = objet.title;
          counts[title] = counts[title] ? counts[title] + 1 : 1;
        });

        // Sort the titles by count in descending order
        const sortedTitles = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

        // Calculate the total count of all titles
        const totalCount = Object.values(counts).reduce((acc, count) => acc + count, 0);

        // Calculate the percentage for each title and format it as a string
        const materials = sortedTitles.map(title => {
          const count = counts[title];
          const percentage = ((count / totalCount) * 100).toFixed(2);
          return `${title}: ${percentage}%`;
        });

        setMostCollectedMaterials(materials);
      })
      .catch(error => console.error(error));


      axios.get('http://10.0.2.2:8000/api/pcollectes')
      .then(response => {
        setTotalCollectPoints(response.data.length);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);
  /*const recyclablePercent = (recyclableItems.length / totalItems.length) * 100;
  const nonRecyclablePercent = 100 - recyclablePercent;*/
  const circleRadius = 80;
  const circleCenter = circleRadius + 10;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const recyclableDashArray = [
    percentageRecyclable * circleCircumference / 100,
    circleCircumference
  ];
  const nonRecyclableDashArray = [
    percentageNonRecyclable * circleCircumference / 100,
    circleCircumference
  ];
  const recyclablePercent = (recyclableItems?.length ?? 0) / (totalItems?.length ?? 1) * 100;
  const nonRecyclablePercent = 100 - recyclablePercent;
  


  const totalArticles = allArticles ? allArticles.length : 0;



  const totalRecyclableArticles = recyclableArticles.length;
  const totalNonRecyclableArticles = totalArticles - totalRecyclableArticles;
  const percentageRecyclable = (totalRecyclableArticles / totalArticles) * 100;
  const percentageNonRecyclable = (totalNonRecyclableArticles / totalArticles) * 100;
  const calculatePercentage = (category) => {
    const total = categories.reduce((accumulator, currentCategory) => {
      return accumulator + currentCategory.materials.length;
    }, 0);

    const categoryCount = category.materials.length;
    const percentage = Math.round((categoryCount / total) * 100);
    return percentage;
  }

const fetchData = async () => {
try {
const response = await axios.get('http://10.0.2.2:8000/api/objets');
setData(response.data);
} catch (error) {
console.log(error);
}
};

const countByDate = () => {
const result = {};
data.forEach(item => {
const date = item.created_at.split('T')[0];
result[date] = result[date] ? result[date] + 1 : 1;
});
return result;
};

const renderData = () => {
const result = countByDate();
return Object.keys(result).map(key => (

<View style={styles.row} key={key}>
<Text style={styles.date}>{key}</Text>
<Text style={styles.count}>{result[key]}</Text>
</View>
));
};

return (
    <ScrollView 
      
        style={{top: 0,width:'100%',marginVertical:0, backgroundColor:'#fff'}}>

<View style={{textAlign: 'center',alignSelf: 'center',flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text style={styles.label}>Nombre total d'objets</Text>
<Text >{'\n'}</Text>
<View style={styles.circle}>

        <Text style={styles.number}>{objetCount}</Text>
      </View>
    
      <Text >{'\n'}{'\n'}{'\n'}</Text>
      <View style={{textAlign: 'center',alignSelf: 'center',flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text style={styles.title}>Evolution du nombre d'objets en fonction du temps</Text>
<Text >{'\n'}</Text>
<View style={styles.header}>
<Text style={styles.headerText}>Date</Text>
<Text style={styles.headerText}>Nombre d'objets</Text>
</View>
{renderData()}
</View>
</View>



<Text >{'\n'}{'\n'}</Text>

<View style={styles.containere}>
  <Text style={styles.title}>Pourcentage des articles recyclables vs non recyclables collectés</Text>
  <Text >{'\n'}{'\n'}</Text>
  <View style={styles.statsContainere}>
    <View style={[styles.state, {backgroundColor: '#5cb85c'}]}>
      <Text style={styles.statValuee}>{percentageRecyclable.toFixed(2)}%</Text>
      <Text style={styles.statLabele}>Articles recyclables</Text>
      <View style={[styles.circlee, {borderColor: '#4cae4c'}]}>
        <Text style={styles.circleTexte}>{percentageRecyclable.toFixed(2)}%</Text>
      </View>
    </View>
    <View style={[styles.state, {backgroundColor: '#d9534f'}]}>
      <Text style={styles.statValuee}>{percentageNonRecyclable.toFixed(2)}%</Text>
      <Text style={styles.statLabele}>Articles non recyclables</Text>
      <View style={[styles.circlee, {borderColor: '#c9302c'}]}>
        <Text style={styles.circleTexte}>{percentageNonRecyclable.toFixed(2)}%</Text>
      </View>
    </View>
  </View>
</View>

    <Text  >{'\n'}{'\n'}{'\n'}{'\n'}</Text>
   <Text style={styles.title}>Répartition des matériaux recyclés</Text>
    <View style={styles.container}>
  <BarChart
    data={{
      labels: mostCollectedMaterials.map(material => material.split(':')[0]),
      datasets: [{
        data: mostCollectedMaterials.map(material => parseFloat(material.split(':')[1])),
      }]
    }}
    width={Dimensions.get('window').width - 20}
    height={200}
    yAxisLabel="%"
    chartConfig={{
      backgroundColor: '#00BFFF',
      backgroundGradientFrom: '#48c9f4f2',
      backgroundGradientTo: '#48c9f459',
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 0
      }
    }}
    style={{
      marginVertical: 0,
      borderRadius: 10
    }}
  />
</View>
<Text >{'\n'}{'\n'}</Text>
<View style={styles.containerp}>
<Text style={styles.title}>Nombre total de points de collecte disponibles</Text>
      <View style={styles.circlep}>
        <Text style={styles.numberp}>{totalCollectPoints}</Text>
      </View>
     
    </View>
    <Text >{'\n'}{'\n'}{'\n'}{'\n'}</Text>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 16,
backgroundColor:"#fff",
},
containerp: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
circlep: {
  width: 150,
  height: 150,
  borderRadius: 75,
  backgroundColor: '#00BFFF',
  justifyContent: 'center',
  alignItems: 'center',
},
numberp: {
  fontSize: 50,
  fontWeight: 'bold',
  color: 'white',
},
textp: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 20,
},



headingContainers: {
    alignItems: 'center',
    marginTop: 30,
  },
  headings: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  circleContainers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  circles: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlePercentages: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  circleLabels: {
    fontSize: 16,
  },


  text: {
    fontSize: 20,
    marginVertical: 5,
  },

containere: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
headinge: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  statsContainere: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  state: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
    width: '45%',
    height: 150,
  },
  statValuee: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  statLabele: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  circlee: {
    borderWidth: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    position: 'absolute',
    top: -20,
    left: '50%',
    marginLeft: -50,
  },
  circleTexte: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },











circlee: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentagee: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  labell: {
    fontSize: 20,
    color: '#666',
  },

outerCircle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth: circleThickness,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: circleSize - circleThickness * 2,
    height: circleSize - circleThickness * 2,
    borderRadius: (circleSize - circleThickness * 2) / 2,
    backgroundColor: '#34A853',
  },
  
  percentText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute',
  },
  typeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 16,
textAlign: 'center',alignSelf: 'center', 
},
header: {
flexDirection: 'row',
marginBottom: 8,
borderBottomWidth: 1,
borderBottomColor: '#fff',
backgroundColor: '#6C63FF',
paddingBottom: 8,
marginHorizontal:20,
},
headerText: {
fontWeight: 'bold',
flex: 1,
fontSize:18,
textAlign: 'center',alignSelf: 'center', 
padding:5,
},
row: {
flexDirection: 'row',
marginBottom: 8,
backgroundColor: '#6C63FF',
marginHorizontal:20,
padding:5,
textAlign: 'center',alignSelf: 'center', 
},
date: {
flex: 1,
textAlign: 'center',alignSelf: 'center', 

},
count: {
flex: 1,
textAlign: 'right',
textAlign: 'center',alignSelf: 'center', 
},
circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center',
    
    marginTop: 24,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Ptrois;
