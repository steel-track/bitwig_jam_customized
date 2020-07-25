/**
 * @classdesc Step Sequencer Mode
 * @class
 * @augments JamMode
 * 
 * @param {NoteView} noteView 
 * @param {DrumPadView} drumPadView 
 * @param {TrackViewContainer} trackView reference to Clip Mode object
 * @param {TrackHandler} trackHandler 
 * @param {Clip} clip the cursor Clip
 * 
 */
function StepMode(noteView, drumPadView, trackView, trackHandler, clip) {
	var stepView = new StepView(clip,noteView);
	var stepLenView = new StepPositionView();
	JamMode.call(this, drumPadView, trackView, stepLenView);

	drumPadView.setStepLenView(stepLenView);
	stepView.setStepLenView(stepLenView);
	stepLenView.setOffsetListener(this);
	
	/**
	 * @param {function} callback callback that exits the Step Mode
	 */
	this.setExitHandler = function(callback) {
		stepView.setExitHandler(callback);
		drumPadView.setExitHandler(callback);
	};

	this.receiveNote = function(on, note, velocity ) {
		this.mainView.receiveNote(on, note, velocity);
	};
	
	this.notifyModifier = function(modifierState) {
		this.mainView.notifyModifier(modifierState);
	};
	
	this.setOffset = function(selPos, mOffset) {
		this.mainView.setOffset(selPos, mOffset);
	};

	this.notifyShift = function(shift) {
		stepLenView.notifyShift(shift);
	};
	
	this.setToDrumMode = function() {
		stepLenView.setSteps(stepView.gridMap().nrOfSteps()*4);
		drumPadView.setStepMode(true);
		if(this.mainView !== drumPadView) {
			this.mainView.exit();
			this.mainView = drumPadView;
		}
	};
	
	this.setToPianoMode = function() {
		stepLenView.setSteps(stepView.gridMap().nrOfSteps());
		if(this.mainView !== stepView) {
			this.mainView.exit();
			this.mainView = stepView;
		}
	};
	
	this.isInDrumMode = function() {
		return this.mainView === drumPadView;
	};
	
	this.isInPianoMode = function() {
		return this.mainView === stepView;
	};
	
	this.setHasDrumPads = function(hasDrumPads) {	
	};
	
	this.navigate = function(direction) {
		if(modifiers.isSelectDown() && (direction === DirectionPad.TOP || direction === DirectionPad.DOWN)) {
			trackHandler.selectSlotInDirection(direction === DirectionPad.TOP ? -1:1);
		} else {
			this.mainView.navigate(direction);
		}
	};
	
	this.notifyClear = function(clearDown) {
		if(clearDown)
			clip.clearSteps();
	};

	this.modifyGrid = function(incValue, pressedModifier) {
		this.mainView.modifyGrid(incValue,pressedModifier);
	};
	
	this.pushAction = function(value) {
		this.mainView.pushAction(value);
	};

	this.update = function() {
		this.mainView.update();
		stepLenView.update();
	};

	this.postEnter = function() {
		modifiers.setLockButtonState(stepView.inMonoMode());
		modifiers.setLockButtonHandler(stepView.handleLockButton);
	};

	
}