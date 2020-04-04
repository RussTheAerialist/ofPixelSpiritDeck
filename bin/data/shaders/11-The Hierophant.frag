#version 150

uniform vec2 screenSize;
uniform float offset;
uniform float PI;
out vec4 outputColor;

float stroke(float x, float s, float w) {
	float d = step(s, x + w * 0.5) - step(s, x - w * 0.5);
	return clamp(d, 0., 1.);
}

float fill(float x, float s) {
	return 1. - step(s, x);
}

vec2 rationalize() {
	vec2 sq = vec2(screenSize.x, screenSize.x);
	float sqo = (screenSize.y - screenSize.x) / screenSize.y;
	vec2 st = (gl_FragCoord.xy - offset) / sq;
	st.y -= sqo;

	return st;
}

float rect(vec2 st, vec2 s) {
	st = st * 2. - 1.;
	return max(abs(st.x/s.x), abs(st.y/s.y));
}

float cross(vec2 st, float s) {
	vec2 size = vec2(.25, s);
	return min(rect(st, size.xy),
						 rect(st, size.yx));
}

void main() {
	vec2 st = rationalize();

	float color = 0.0;
	float color2 = 0.0;
	float color3 = 1.0;
	float r = rect(st, vec2(1.));
	float c = cross(st, 1.);

	color += fill(r, .5);
	color *= step(.5, fract(c*4.));
	color *= step(1., c);
	color += fill(c, .5);
	color += stroke(r, 0.8, 0.03);
	color += stroke(r, 0.68, 0.08);

	outputColor = vec4(color, color, color, 1.0);
}