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

float circle(vec2 pos) {
	return length(pos - .5) * 2.;
}

void main() {
	vec2 st = rationalize();

	float color = fill(circle(st), 0.65);
	color -= fill(circle(st - vec2(.1, .05)), .5);

	// color = step(0.5 + cos(st.y * PI) * 0.25, pos);
	outputColor = vec4(color, color, color, 1.0);
}