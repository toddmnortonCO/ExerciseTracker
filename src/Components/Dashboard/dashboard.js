import React, { Component } from 'react';

export default class Dashboard extends Component{ 
    constructor() {
        super();
        this.setState = {
            activity: '',
            duration: '',
            distance: '',
            summary: ''
        }
    }

    render(){
        return (
          <section>
            <div>
                    <h1>Hello!  Welcome to your exercise tracking dashboard.</h1>
                    
            </div>
          </section>
        );
    }
}