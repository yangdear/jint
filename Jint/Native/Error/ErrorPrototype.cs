﻿using Jint.Native.Object;
using Jint.Runtime;
using Jint.Runtime.Interop;

namespace Jint.Native.Error
{
    /// <summary>
    /// http://www.ecma-international.org/ecma-262/5.1/#sec-15.11.4
    /// </summary>
    public sealed class ErrorPrototype : ErrorInstance
    {
        private ErrorPrototype(Engine engine, string name)
            : base(engine, name)
        {
        }

        public static ErrorPrototype CreatePrototypeObject(Engine engine, ErrorConstructor errorConstructor, string name)
        {
            var obj = new ErrorPrototype(engine, name) { Extensible = true };
            obj.FastAddProperty("constructor", errorConstructor, true, false, true);

            if (name != "Error")
            {
                obj.Prototype = engine.Error.PrototypeObject;
            }

            return obj;
        }

        public void Configure()
        {
            // Error prototype functions
            FastAddProperty("toString", new ClrFunctionInstance<object, object>(Engine, ToString), true, false, true);
        }

        private object ToString(object thisObject, object[] arguments)
        {
            var o = thisObject as ObjectInstance;
            if (o == null)
            {
                throw new JavaScriptException(Engine.TypeError);
            }

            var name = TypeConverter.ToString(o.Get("name"));

            var msg = o.Get("message");
            if (msg == Undefined.Instance)
            {
                msg = "";
            }
            else
            {
                msg = TypeConverter.ToString(msg);
            }
            if (name == "")
            {
                return msg;
            }
            if (msg == "")
            {
                return name;
            }
            return name + ": " + msg;
        }
    }
}
