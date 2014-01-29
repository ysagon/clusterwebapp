from datetime import *

def now():
  return datetime.now()

def nextCentury():
  return now() + timedelta( days=36500 )

def parseDate( dateStr ):
  return datetime.strptime( dateStr, "%Y-%m-%dT%H:%M:%S" )

__secPerMin = 60
__secPerHour = 3600
__secPerDay = __secPerHour * 24 

def __duration( dt ):
  n = datetime.now()
  if( n > dt ):
    delta = n - dt
    future = False
  else:
    delta = dt - n
    future = True
  return delta,future

def isLate( dt ):
  delta,f = __duration(dt)
  return delta.days >= 10

def diffDate( dt ):
  delta,future = __duration(dt)
  if delta.days > 0:
    d = delta.days + ( 1.0 * delta.seconds / __secPerDay )
    res =  "%.1f days" % (d)
  elif delta.seconds < 60:
    res =  "A few seconds"
  elif delta.seconds < __secPerHour:
    m = delta.seconds /__secPerMin
    res = "%d minutes" % (m)
  else:
    h = 1.0 * delta.seconds / __secPerHour
    res =  "%.1f hours" % (h)
  if future:
    return res
  else:
    return res

