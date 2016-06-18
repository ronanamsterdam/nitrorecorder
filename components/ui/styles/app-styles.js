var textC             = '#A1C659',
    bcC               = 'rgb(42, 47, 58)';

var buttonBc          = '#24282E',
    buttonHoverBc     = '#2D3138',
    buttonActiveBc    = '#14161A',
    buttonBorderBc    = '#1A1D22';

var fromLabelBc       = '#4F5A65',
    formLabelTextC    = 'white';

var actionTextInputBc = '#3D444E';

//Toolbar style
export var uiHolderStyleVisible = {
      background:     bcC,
      bottom:         0,
      borderRadius:   '1px',
      left:           0,
      opacity:        '1',
      padding:        '15px 5px',
      position:       'fixed',
      transition:     'all 0.2s ease-out',
      zIndex:         '10000'
    };

export var uiButtonStyle = {
      color:        textC,
      background:   buttonBc,
      border:       '1px solid ' + buttonBorderBc,
      borderRadius: '2px',
      cursor:       'pointer',
      margin:       '0 10px',
      padding:      '10px',
      outline:      'none',
      zIndex:       '10000'
    };
//NOT BEING USED
export var uiButtonStyleHover = Object.assign({}, uiButtonStyle, {
      background:   buttonHoverBc,
    });
//NOT BEING USED
export var uiButtonStyleActive = Object.assign({}, uiButtonStyle, {
      background:   buttonActiveBc,
    });

export var uiHolderStyleNotVisible = Object.assign({}, uiHolderStyleVisible,{
      bottom:       '-30%',
      opacity:      '0'
    });

export var uiButtonWithInputInsideAndLabelStyle = Object.assign({}, uiButtonStyle, {
      padding: '0'
    });

export var uiHiddenInputStyle = {
      height:   '0.1px',
      opacity:  '0',
      overflow: 'hidden',
      position: 'absolute',
      width:    '0.1px',
      zIndex:   '-1'
    };

export var uiLabelInButtonStyle = {
      cursor:   'pointer',
      display:  'block',
      padding:  '10px'
    }

export var uiMarginTop10 = {
      marginTop: '10px'
    };

export var uiFormLabelStyle = {
      color:      formLabelTextC,
      background: fromLabelBc,
      left:       0,
      padding:    '5px',
      position:   'absolute',
      right:      '0',
      top:        '-29px'
    }


///Add Action from styles
export var actionformStyle = Object.assign({}, uiHolderStyleVisible, {
    bottom:       '197px',
    color:        textC,
    left:         '131px',
    minHeight:    '115px'
  });

export var actionUlStyle = {
  listStyle:    'none',
  marginBottom: 0,
  padding:      '0 0 29px 0',
  width:        '470px'
}

export var actionListyle = {
  margin: '10px'
}

export var actionInputStyle = {
  background:       actionTextInputBc,
  border:           'none',
  color:            textC,
  float:            'right',
  outline:          'none',
  padding:          '5px',
  WebkitAppearance: 'none',
  width:            '60%'
}

export var actionButtonStyle = Object.assign({}, uiButtonStyle,
  {
    bottom:     '10px',
    left:       0,
    position:   'absolute'
  });

export var actionFloatRightButton = Object.assign({}, uiButtonStyle,
  {
    float:    'right',
    left:     'initial',
    right:    0
  });

export var actionFormLabelStyle = Object.assign({}, uiFormLabelStyle, {
    top:        '-15px'
  });

//Events tracking form style
export var eventsformStyle = Object.assign({}, uiHolderStyleVisible, {
    bottom:       '197px',
    color:        textC,
    padding:      '10px 5px 15px 5px',
  });

export var eventsUlStyle = {
  listStyle:  'none',
  margin:     0,
  padding:    0,
  width:      '120px'
};

export var eventslistyle = {
  margin: '10px 0 0'
};

export var eventsInputStyle = {
  background:       actionTextInputBc,
  border:           'none',
  color:            textC,
  outline:          'none',
  padding:          '5px',
};

export var eventsFormLabelStyle = Object.assign({}, uiFormLabelStyle, {
  top:        '-15px'
});
