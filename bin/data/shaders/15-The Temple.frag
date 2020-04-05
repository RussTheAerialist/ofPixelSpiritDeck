#version 150

uniform vec2 screenSize;
uniform float offset;
uniform float PI;
out vec4 outputColor;

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

float flip(float v, float pct) {
	return mix(v, 1. - v, pct);
}

float triangle(vec2 st) {
	st = (st*2.-1.)*2.;

	return max(
		abs(st.x) * 0.866025 + st.y * 0.5,
		-st.y * 0.5
	);
}

void main() {
	vec2 st = rationalize();

	float color = 0.0;
	float color2 = 0.0;
	float color3 = 0.0;

	st.y = 1.-st.y;
	float c = triangle(st);
	float i = triangle(vec2(st.x, .82-st.y));

	color2 += fill(c, .7);
	color2 -= fill(i, .36);
	color = flip(color2, color3);

	// color += flip(color2, color3);

	outputColor = vec4(color, color, color, 1.0);
}