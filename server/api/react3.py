from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class AllCourseData(Resource):
    def get(self):
       result = exec_get_all("SELECT * FROM courses order by id");
       return result

class UpdateCourseData(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('selected', type=bool)

    def put(self, param1):
        args = UpdateCourseData.parser.parse_args()
        selected = args['selected']
        print(selected)
        exec_commit("UPDATE courses SET selected = '%s' WHERE id = '%s'" % (selected, param1))

class SelectedCourseData(Resource):
    def get(self, param1):
        result = exec_get_all("SELECT name, c_desc FROM courses WHERE selected = '%s'" % param1)
        return result

