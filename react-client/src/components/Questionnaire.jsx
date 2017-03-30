import React from 'react';

class Questionnaire extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <h2>Help Us Give You Great Recommentations</h2>
        <form action="http://localhost:3000/train" method='POST'>
          <div>
            Please check each wine type that you enjoy drinking (if you don't know leave it blank)
          </div>
          <div>
            <input type="checkbox" name="wineType" value="red"/>
            <label>Red</label><br/>
            <input type="checkbox" name="wineType" value="white"/>
            <label>White</label>
          </div>
          <div>
            Please check each varietal that you enjoy drinking (if you don't know leave it blank)
          </div>
          <div>
            <input type="checkbox" name="varietal" value="cabernet"/>
            <label>Cabernet</label><br/>
            <input type="checkbox" name="varietal" value="merlot"/>
            <label>Merlot</label><br/>
            <input type="checkbox" name="varietal" value="chardonnay"/>
            <label>Chardonnay</label><br/>
            <input type="checkbox" name="varietal" value="sauvignonBlanc"/>
            <label>Sauvignon Blanc</label>
          </div>
          <div>
            Please check each price you are comfortable paying per bottle of wine
          </div>
          <div>            
            <input type="checkbox" name="price" value="$10"/>
            <label>$10</label><br/>
            <input type="checkbox" name="price" value="$20"/>
            <label>$20</label><br/>
            <input type="checkbox" name="price" value="$30"/>
            <label>$30</label><br/>
            <input type="checkbox" name="price" value="$40"/>
            <label>$40</label><br/>
            <input type="checkbox" name="price" value="$50"/>
            <label>$50</label><br/>
            <input type="checkbox" name="price" value="$60"/>
            <label>$60</label><br/>
            <input type="checkbox" name="price" value="$70"/>
            <label>$70</label><br/>
            <input type="checkbox" name="price" value="$80"/>
            <label>$80</label><br/>
            <input type="checkbox" name="price" value="$80"/>
            <label>$90</label><br/>
            <input type="checkbox" name="price" value="$100"/>
            <label>$100</label><br/>                                                                                                            
          </div>
          <div>
            <button>Submit Preferences</button> 
          </div>
        </form>
      </div>
    )
  }

}

export default Questionnaire;
