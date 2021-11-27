import React from 'react'
import {Table,tbody,tr,th,td,Button} from 'reactstrap';
import {Modal, ModalBody, ModalHeader,Label,Input,Dropdown,ModalFooter} from 'reactstrap';

export default class MyTable extends React.Component{

	constructor(props){
        super(props);
        this.state={
        course_data :[],
        course_id:"",
        edit_status:false,
        add_status:false,
        course_name:"",
        course_descrip:"",
        course_details:"",
       	course_departId:""
 }

    }

     updateData(apiResponse) {

        this.setState({course_data: apiResponse})
    }

  async fetchData () {
        //In package.json add "proxy": "http://localhost:5000" 
        //This will allow redirect to REST api in Flask w/o CORS errors
       await   fetch('/coursedata')
         .then(
             response => response.json() 
             )//The promise response is returned, then we extract the json data
         .then (jsonOutput => //jsonOutput now has result of the data extraction
                  {
                       this.updateData(jsonOutput)
                    }
              )
      }
    
     componentDidMount(){
        this.fetchData();
        

    }


    handle_edit = (evk) =>{
    	
    
    	this.setState({edit_status:true,course_id:evk.target.value,edit_row:evk.target.id,course_departId:this.state.course_data[evk.target.id][1],course_name:this.state.course_data[evk.target.id][2],course_descrip:this.state.course_data[evk.target.id][3],course_details:this.state.course_data[evk.target.id][4]})
    	
    	


    }
   
    handle_add () {

    	this.setState({add_status:true,course_departId:"1"})



    }
      add_course(){
    	
    	 fetch('/coursedata',{

    		method:'post',
    		headers :{'Content-Type':'application/json'},
    		body:JSON.stringify(
    			{
    				'dept_id':Number.parseInt(this.state.course_departId),
    				'name':this.state.course_name,
    				 'c_desc':this.state.course_descrip,
    				 'details':this.state.course_details,
    				 "selected":'false'
    			}

    		
    		)

    	}).then(
    		this.fetchData()
    	)
    }
	edit_course(){
	    	
	    	fetch('/coursedata/'+this.state.course_id,{

	    		method:'PUT',
	    		headers :{'Content-Type':'application/json'},
	    		body:JSON.stringify(
	    			{
	    				'dept_id':Number.parseInt(this.state.course_departId),
	    				'name':this.state.course_name,
	    				 'c_desc':this.state.course_descrip,
	    				 'details':this.state.course_details,
	    				 "selected":'false'
	    			}

	    		
	    		)

	    	}).then(
	    		this.fetchData()
	    	)
	    }


    updateCourseName = (e)=>{

    	this.setState({course_name:e.target.value})

    }
    updateCourDescription = (e)=>{

    	this.setState({course_descrip:e.target.value})

    }
	updateCourseDetails = (e)=>{

    	this.setState({course_details:e.target.value})

    }
    updateDepartment = (e) =>{


    	this.setState({course_departId:e.target.value})

    }

    add (){
    	this.setState({add_status:false})
    	this.add_course()

    }
    update(){

    	this.setState({edit_status:false})
    	this.edit_course()
    }
  
    render(){
    	
		if ( this.state.course_data == null )
        	return (<div>No data</div>)
        else{
        	return (

        		<div>
        		<h1 style={{ textAlign:"center"}}>Course List</h1>
        			<Table striped>
        				<tr>
        					<th>

        					</th>
        					<th>
        						name
        					</th>
        					<th>
        						description
        					</th>
        					<th>
        						details
        					</th>
        					<th>
        						department
        					</th>
        					<th>
        						college
        					</th>
        				</tr>
        				<tbody>
        					{this.state.course_data.map((item,row)=>(
        						<tr>
        						<td>
        						<Button onClick = {this.handle_edit} id = {row} value = {this.state.course_data[row][0]} >Edit </Button>
        		
        						</td>
        						<td>
        							{this.state.course_data[row][2]}
        						</td>	
        						<td>
        							{this.state.course_data[row][3]}
        						</td>
        						<td>
        							{this.state.course_data[row][4]}
        						</td>
        						<td>
        							{this.state.course_data[row][5]}
        						</td>
        						<td>
        							{this.state.course_data[row][6]}
        						</td>
        						<td>
        							{this.state.course_data[row][7]}
        						</td>
        						<td>
        							{this.state.course_data[row][8]}
        						</td>

        						</tr>
        					))}		
        				</tbody>

        			</Table>

        				<Button  color="primary" onClick = {this.handle_add} >Add</Button>
        				<Modal isOpen={this.state.add_status} >
				                <ModalHeader>Add Course</ModalHeader>
				                <ModalBody>
					                <Label for="cName">Course Name</Label>
					                <Input onChange={this.updateCourseName}> </Input>
					         		
					         		<Label for="cDescrip">Course Description</Label>
					               	 <Input onChange={this.updateCourDescription}> </Input>

					                 <Label for="cDetails">Course Details</Label>
					                 <Input onChange={this.updateCourseDetails}> </Input>
					               	 
					               	 <Label for="cDepartment">Course Department</Label>
					               	 <div>
					              	 <select onChange= {this.updateDepartment} >

					              	 	<option value= "1" selected >
					              	 		Softare Engineering
					              	 	</option>

					              	 	<option value = "2">
					              	 		Computer Science
					              	 	</option>

					              	 	<option value = "3"> 
					              	 		Computer Engineering
					              	 	</option>
					              	 	<option value = "4">
					              	 		Virology
					              	 	</option>

					              	 </select>
					              	 </div>
					              	 <ModalFooter>
				                        <Button color="primary" onClick={this.add} >Ok</Button>
				                        <Button onClick={()=>this.setState({add_status:false})} >Cancel</Button>
				                   </ModalFooter>
				               </ModalBody>
				            </Modal>


				            <Modal isOpen={this.state.edit_status} >
				                <ModalHeader>Edit Course</ModalHeader>
				                <ModalBody>
					                <Label for="cName">Course Name</Label>
					                <Input id="cName" type='text'value ={this.state.course_name} onChange={this.updateCourseName} contentEditable="true"></Input>
					         		
					         		<Label for="cDescrip">Course Description</Label>
					               	 
					               	 <Input id = "cDescrip" type = 'text'value ={this.state.course_descrip} onChange={this.updateCourDescription}> </Input>

					                 <Label for="cDetails">Course Details</Label>
					                 <Input id = "cDetails"  type = 'text'value ={this.state.course_details} onChange={this.updateCourseDetails}> </Input>
					               	 <Label for="cDepartment">Course Department</Label>

					              	
					              	<div>

					              	 <select onChange = {this.updateDepartment}>

					              	 	<option value= "1" selected>
					              	 		Softare Engineering
					              	 	</option>
					              	 	<option value = "2">
					              	 		Computer Science
					              	 	</option>

					              	 	<option value = "3"> 
					              	 		Computer Engineering
					              	 	</option>
					              	 	<option value = "4">
					              	 		Virology
					              	 	</option>

					              	 </select>
					              	 </div>
				               	  <ModalFooter>
				                        <Button color="primary" onClick={this.update}>Ok</Button>
				                        <Button onClick={()=>this.setState({edit_status:false})} >Cancel</Button>
				                   </ModalFooter>
				               </ModalBody>
				            </Modal>	

        		</div>
        	);
        }


    }

}