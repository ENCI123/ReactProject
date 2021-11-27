from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class Coursedata(Resource):
    def get(self):
       result = exec_get_all("select courses.id,courses.dept_id,courses.name,courses.c_desc,courses.details,department.name,college.name from courses inner join department on courses.dept_id = department.id inner join college on college.id = department.college_id order by id asc;");
       return result
    parser = reqparse.RequestParser()
    parser.add_argument('dept_id',type=str)
    parser.add_argument('name',type=str)
    parser.add_argument('c_desc',type=str)
    parser.add_argument('details',type=str)

    def post(self):
    	args = Coursedata.parser.parse_args()
    	dept_id = args['dept_id']
    	name = args['name']
    	c_desc = args['c_desc']
    	details = args['details']
    	selected  = 'false'
    	return exec_commit("INSERT INTO courses(id,dept_id,name,c_desc,details,selected) VALUES(default,%s,%s,%s,%s,%s)",(dept_id,name,c_desc,details,"false"))

class SingleCourse(Resource):
	
	def get(self,id):
		
		return  exec_get_all("select courses.id,courses.dept_id,courses.name,courses.c_desc,courses.details,department.name,college.name from courses inner join department on courses.dept_id = department.id inner join college on college.id = department.id where courses.id = %s;",([id]));
	
	parser = reqparse.RequestParser()
	parser.add_argument('dept_id',type=str)
	parser.add_argument('name',type=str)
	parser.add_argument('c_desc',type=str)
	parser.add_argument('details',type=str)
	
	def put(self,id):
		args = SingleCourse.parser.parse_args()
		dept_id = args['dept_id']
		name = args['name']
		c_desc = args['c_desc']
		details = args['details']
		return exec_commit("UPDATE courses set dept_id=%s,name=%s,c_desc=%s,details=%s where id = '%s';",(dept_id,name,c_desc,details,id))


