uniform vec4 position; 
uniform vec4 normal; 

varying vec4 pcolor;

uniform mat4 local2clip;
uniform mat4 local2eye;
uniform mat4 normal_matrix;
uniform mat4 world2eye; 

uniform vec4 light_ambient;
uniform vec4 light_diffuse;
uniform vec4 light_specular;
uniform vec4 light_pos;

uniform vec4 mat_ambient;
uniform vec4 mat_diffuse;
uniform vec4 mat_specular;
uniform float mat_shine; 


//
// this shader just passes the interpolated fragment color along 
//
void main() { 
	vec4 Lpos =  world2eye * light_pos; 
	vec4 Vpos =  local2eye * position; 
    vec3 N = normalize(vec3(normal_matrix * normal)); 
    vec3 L = normalize(vec3(Lpos - Vpos)); 
	vec3 R = normalize(reflect(-L, N)); 
	vec3 V = normalize(vec3(-Vpos)); 

	//ambient
	vec4 ambient = light_ambient * mat_ambient;
	//diffuse
	float NdotL = dot(N,L);
	if (NdotL < 0.0) NdotL = 0.0;
	vec4 diffuse = light_diffuse * mat_diffuse * NdotL;
	//specular
	float RdotV = dot(R,V);
	if(RdotV < 0.0) RdotV = 0.0;
	if(NdotL == 0.0) RdotV = 0.0;
	vec4 specular = pow(RdotV,mat_shine) * light_specular * mat_specular;

    //gl_FragColor = pcolor; 
    gl_FragColor = pcolor;
	
 } 
