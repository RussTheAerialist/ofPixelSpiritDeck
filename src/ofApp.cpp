#include "ofApp.h"
#include <cmath>

const int FONT_SIZE = 16;
const string FONT_NAME = "Montserrat-Medium.ttf";
const int BUFFER = 50;

//--------------------------------------------------------------
void ofApp::setup(){
	if (!font.load(FONT_NAME, FONT_SIZE)) {
		ofLog(OF_LOG_ERROR) << "Unable to load font " << FONT_NAME;
		ofExit(1);
	}

	enumerate_shaders();

	rectSize.x = ofGetWidth() - BUFFER * 2;
	rectSize.y = ofGetHeight() - BUFFER * 2;

	load_shader();
}

void ofApp::enumerate_shaders() {
	ofLog(OF_LOG_NOTICE) << "Enumerating Shaders";
	ofDirectory dir("./shaders");
	dir.allowExt("frag");
	dir.listDir();

	for(size_t i =0; i < dir.size(); ++i) {
		string name = dir.getName(i);
		ofLog(OF_LOG_NOTICE) << "Processing Shader: " << name;
		size_t position = name.size() - 5;
		shader_names.push_back(name.erase(position, 5));
	}

	std::sort(shader_names.begin(), shader_names.end());
	no_shaders = shader_names.size();
	selected_index = no_shaders - 1;
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
	if (valid_load) {
		ofSetColor(255);
		ofPushMatrix();
		shader.begin();
		ofTranslate(BUFFER, BUFFER);
		shader.setUniform1f("PI", M_PI);
		shader.setUniform1f("offset", BUFFER);
		shader.setUniform2f("screenSize", rectSize.x, rectSize.y);
		ofDrawRectangle(0, 0, rectSize.x, rectSize.y);
		shader.end();
		ofPopMatrix();
	} else {
		ofSetColor(255, 102, 51);
		ofDrawRectangle(BUFFER, BUFFER, rectSize.x, rectSize.y);
	}

	// Write Shader Name
	ofSetColor(255);
	font.drawString(shader_names[selected_index], 25, (BUFFER - font.getLineHeight()) + 12.5);

}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
	switch (key) {
		case ' ': selected_index = (selected_index + 1) % no_shaders; load_shader(); break;
	}
}

void ofApp::load_shader() {
	valid_load = shader.load("basic.vert", "shaders/" + shader_names[selected_index] + ".frag");
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){

}
