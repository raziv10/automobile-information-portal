export class ApiConst {
  // public static SERVER_URL = 'http://192.168.123.22:8080/api/';
  public static SERVER_URL = 'http://127.0.0.1:8000/api/';
  public static BASE_URL = 'http://127.0.0.1:8000/';

  // Common
  public static LOGIN = 'users/login/';
  public static TOKEN = 'auth/token/';
  public static REGISTER = 'users/register/';
  public static BLOGPOSTLIST = 'posts/';
  public static BLOGPOSTCREATE = 'posts/create/';
  public static BRANDLIST = 'posts/getBrandList/';
  public static MODELLIST = 'posts/getModelList/';
  public static COMMENTLIST = 'comments/';
  public static COMMENTCREATE = 'create/';
  public static AUTHORIZATION = 'Authorization';
  public static TOKENHEADER = localStorage.getItem('token');
  public static JWT = 'JWT ';
  public static PREDICTION = 'predict/ ';
  public static POSTEDIT = '/edit/ ';
  public static POSTDELETE = '/delete/ ';
  public static BRANDLOGO = 'getCompanyLogos/ ';
  public static LOCATION = 'locationDetails/ ';

}
