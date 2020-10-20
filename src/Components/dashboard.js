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
                <div>hello
                    {this.state}
                </div>
            </section>
        )
    }
}