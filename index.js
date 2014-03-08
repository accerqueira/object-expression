var ObjectExpression = module.exports = function (expression) {
    if (!(this instanceof ObjectExpression)) return new ObjectExpression(expression);

    this._expression = expression || {};
    this.test = this.test.bind(this);
};

ObjectExpression.not = function(expression) {
    return { '$not': expression };
};

ObjectExpression.and = function(___) {
    var expressions = Array.prototype.slice.call(arguments);
    return { '$and': expressions };
};

ObjectExpression.or = function(___) {
    var expressions = Array.prototype.slice.call(arguments);
    return { '$or': expressions };
};

ObjectExpression.test = function(value, name, expression) {
    if (name in ObjectExpression.operator) {
        return ObjectExpression.operator[name](value, expression);
    }
    return ObjectExpression.operator['$property'](value[name], expression);
};

ObjectExpression.operator = [];

ObjectExpression.operator['$and'] = function(value, expressions) {
    var result = true;
    if (expressions instanceof Array) {
        for (var i = 0; i < expressions.length; i++) {
            result = ObjectExpression.test(value, '$and', expressions[i]);
            if (result === false) break;
        }
    } else {
        for (var key in expressions) {
            result = ObjectExpression.test(value, key, expressions[key]);
            if (result === false) break;
        }
    }
    return result;
};

ObjectExpression.operator['$or'] = function(value, expressions) {
    var result = true;
    if (expressions instanceof Array) {
        for (var i = 0; i < expressions.length; i++) {
            result = ObjectExpression.test(value, '$and', expressions[i]);
            if (result === true) break;
        }
    } else {
        for (var key in expressions) {
            result = ObjectExpression.test(value, key, expressions[key]);
            if (result === true) break;
        }
    }
    return result;
};

ObjectExpression.operator['$not'] = function(value, expression) {
    var result = true;
    if (expression instanceof Array || expression instanceof Object) {
        result = ObjectExpression.test(value, '$and', expression);
    } else {
        result = ObjectExpression.test(value, '$eq', expression);
    }
    return !result;
};


ObjectExpression.operator['$eq'] = function(value, expression) {
    return value == expression;
};

ObjectExpression.operator['$gt'] = function(value, expression) {
    return value > expression;
};

ObjectExpression.operator['$gte'] = function(value, expression) {
    return value >= expression;
};

ObjectExpression.operator['$lt'] = function(value, expression) {
    return value < expression;
};

ObjectExpression.operator['$lte'] = function(value, expression) {
    return value <= expression;
};

ObjectExpression.operator['$in'] = function(value, expression) {
    return expression.indexOf(value) >= 0;
};

ObjectExpression.operator['$exists'] = function(value, expression) {
    return (value !== undefined) === expression;
};

ObjectExpression.operator['$regex'] = function(value, expression) {
    return new RegExp(expression).test(value);
};

ObjectExpression.operator['$all'] = function(value, expression) {
    var result = false, key, i, k;
    if (value === undefined || !('length' in value))
        value = [];

    for (i = 0; i < value.length; i++) {
        if (expression instanceof Array) {
            for (k = 0; k < expression.length; k++) {
                result = ObjectExpression.test(value[i], '$and', expression[k]);
                if (result === false) break;
            }
        } else {
            for (key in expression) {
                result = ObjectExpression.test(value[i], key, expression[key]);
                if (result === false) break;
            }
        }
    }
    return result;
};

ObjectExpression.operator['$any'] = function(value, expression) {
    var result = false, key, i, k;
    if (value === undefined || !('length' in value))
        value = [];

    for (i = 0; i < value.length; i++) {
        result = true;
        if (expression instanceof Array) {
            for (k = 0; k < expression.length; k++) {
                result = result && ObjectExpression.test(value[i], '$and', expression[k]);
            }
        } else {
            for (key in expression) {
                result = result && ObjectExpression.test(value[i], key, expression[key]);
            }
        }
        if (result === true) break;
    }
    return result;
};

ObjectExpression.operator['$size'] = function(value, expression) {
    var result = true;
    if (expression instanceof Array || expression instanceof Object) {
        result = ObjectExpression.test(value.length, '$and', expression);
    } else {
        result = ObjectExpression.test(value.length, '$eq', expression);
    }
    return result;
};

ObjectExpression.operator['$property'] = function(value, expression) {
    var result = true;
    if (expression instanceof Array || expression instanceof Object) {
        result = ObjectExpression.test(value, '$and', expression);
    } else {
        result = ObjectExpression.test(value, '$eq', expression);
    }
    return result;
};

ObjectExpression.prototype.and = function(___) {
    var expressions = Array.prototype.slice.call(arguments);
    this._expression = ObjectExpression.and.apply(null, [this._expression].concat(expressions));
    return this;
};

ObjectExpression.prototype.or = function(___) {
    var expressions = Array.prototype.slice.call(arguments);
    this._expression = ObjectExpression.or.apply(null, [this._expression].concat(expressions));
    return this;
};

ObjectExpression.prototype.test = function(object) {
    return ObjectExpression.test(object, '$and', this._expression);
};
